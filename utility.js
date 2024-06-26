


export function nameSpaceTrimmer(str){
    return str.split(':').pop();
}

export function recursiveNamespaceTrimmer(obj){
    // Check if obj is an Object or Array

    // Array
    if (Array.isArray(obj)) {
        for (let item of obj) {
            recursiveNamespaceTrimmer(item);
        }
    }
    // Object
    else if (obj instanceof Object){
        let newName;
        for(let key of Object.getOwnPropertyNames(obj)) {
            newName = nameSpaceTrimmer(key);
            if (newName !== key) {
                Object.defineProperty(obj, newName,Object.getOwnPropertyDescriptor(obj, key));
                delete obj[key];
            }
            recursiveNamespaceTrimmer(obj[newName]);
        }
    }
}


export function getCoordinates(point){
    let coord = point.split(' ');
    // Longitude first then latitude. Following GeoJSON standard
    return [parseFloat(coord[1]), parseFloat(coord[0])];
}