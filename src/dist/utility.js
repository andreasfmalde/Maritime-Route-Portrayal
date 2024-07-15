import 'https://cdn.jsdelivr.net/npm/xml-js@1.6.11/dist/xml-js.min.js'; // For testing, change to: 'xml-js'
import {
    bearing, point, lineString, lineIntersect,
    transformScale, transformTranslate
} from 'https://cdn.jsdelivr.net/npm/@turf/turf@7.0.0/+esm'; // For testing, change to: '@turf/turf'


export function nameSpaceTrimmer(str) {
    return str.split(':').pop();
}

export function recursiveNamespaceTrimmer(obj) {
    if (Array.isArray(obj)) {
        for (let item of obj) {
            recursiveNamespaceTrimmer(item);
        }
    }
    else if (obj instanceof Object) {
        let newName;
        for (let key of Object.getOwnPropertyNames(obj)) {
            newName = nameSpaceTrimmer(key);
            if (newName !== key) {
                Object.defineProperty(obj, newName, Object.getOwnPropertyDescriptor(obj, key));
                delete obj[key];
            }
            recursiveNamespaceTrimmer(obj[newName]);
        }
    }
}

export function parseXML(xml) {
    const object = JSON.parse(xml2json(xml, { compact: true, spaces: 4 }));
    if (!object) {
        return null;
    }
    recursiveNamespaceTrimmer(object);
    return object;
}

export function getCoordinates(point) {
    let coord = point.split(' ');
    // Longitude first then latitude. Following GeoJSON standard
    if (coord.length > 2) {
        coord = coord.filter(c => c !== '');
    }
    return coord.length === 2 ? [parseFloat(coord[1]), parseFloat(coord[0])] : [NaN, NaN];
}

export function offsetLine(line, distance){
    const lineCoords = line.geometry.coordinates;
    const transformAngle = distance < 0 ? -90 : 90;
    if (distance < 0) distance = -distance;

    const offsetLines = [];
    for (let i = 0; i < lineCoords.length - 1; i++) { 
        const angle = bearing(lineCoords[i], lineCoords[i + 1]) + transformAngle;
        const firstPoint = transformTranslate(point(lineCoords[i]), distance, angle, { units:'meters' })?.geometry.coordinates;
        const secondPoint = transformTranslate(point(lineCoords[i + 1]), distance, angle, { units: 'meters' })?.geometry.coordinates;
        offsetLines.push([firstPoint, secondPoint]);
    }
    const offsetCoords = [offsetLines[0][0]]; 
    for (let i = 0; i < offsetLines.length; i++) { 
        if (offsetLines[i + 1]){
            const firstLine = transformScale(lineString(offsetLines[i]), 25); 
            const secondLine = transformScale(lineString(offsetLines[i + 1]), 25);
            const intersect = lineIntersect(firstLine, secondLine);
            if (intersect.features.length > 0) {
                offsetCoords.push(intersect.features[0].geometry.coordinates);
            }

        } else offsetCoords.push(offsetLines[i][1]); 
    }
    return lineString(offsetCoords);
};