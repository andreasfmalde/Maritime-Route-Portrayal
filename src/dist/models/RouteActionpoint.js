import * as turf  from 'https://cdn.jsdelivr.net/npm/@turf/turf@7.0.0/+esm'; // For testing, change to: '@turf/turf'
import { getCoordinates } from "../utility.js";

class RouteActionPoint{
    constructor(object){
        this.id = object._attributes.id;
        this.routeActionPointID = parseInt(object?.routeActionPointID?._text);
        this.routeActionPointName = object?.routeActionPointName?._text || '';
        this.routeActionPointRadius = parseFloat(object?.routeActionPointRadius?._text) || 0.0;
        this.routeActionPointTimeToAct = parseFloat(object?.routeActionPointTimeToAct?._text) || 0.0;
        this.routeActionPointRequiredAction = parseInt(object?.routeActionPointRequiredAction?._text) || 0;
        this.routeActionPointRequiredActionDescription = object?.routeActionPointRequiredActionDescription?._text || '';
        this.routeActionPointExtensions = {};
        this.coordinates = [];
        this.type = 'actionpoint';

        if(object?.routeActionPointExtensions instanceof Object){
            this.routeActionPointExtensions = {
                manufacturerId: object?.routeActionPointExtensions?._attributes?.routeExtensionsManufacturerId || '',
                routeExtensionsName: object?.routeActionPointExtensions?._attributes?.routeExtensionsName || '',
                version: parseInt(object?.routeActionPointExtensions?._attributes?.routeExtensionsVersion) || 0,
                note: object?.routeActionPointExtensions?.routeExtensionsNote?._text || ''
            }
        }

    }

    getId(){
        return this.id;
    }
    getCoordinates(){
        return this.coordinates;
    }
    setCoordinates(coordinates){
        this.coordinates = coordinates;
    }

    getProperties(){

        return{
            id: this.id,
            type: this.type,
            routeActionPointID: this.routeActionPointID,
            routeActionPointName: this.routeActionPointName,
            routeActionPointRadius: this.routeActionPointRadius,
            routeActionPointTimeToAct: this.routeActionPointTimeToAct,
            routeActionPointRequiredAction: this.routeActionPointRequiredAction,
            routeActionPointRequiredActionDescription: this.routeActionPointRequiredActionDescription,
            routeActionPointExtensions: this.routeActionPointExtensions
        }
    }

}



export class PointActionPoint extends RouteActionPoint{
    constructor(obj){
        super(obj);
        this.type = 'actionpoint-point';
        this.coordinates = this.convertCoordinates(obj.geometry) || [];
    }

    convertCoordinates(geometry){
        const coordinates = getCoordinates(geometry.pointProperty.Point.pos._text);
        if (coordinates[0] == NaN || coordinates[1] == NaN) {
            return null;
        }
        return coordinates;
        
    }

    toGeoJSON(){
        return turf.point(this.coordinates, this.getProperties())
    }
}




export class CurveActionPoint extends RouteActionPoint{
    constructor(obj){
        super(obj);
        this.type = 'actionpoint-curve';
        this.coordinates = this.convertCoordinates(obj.geometry) || [[],[]];
    }

    convertCoordinates(geometry){
        const posList = [];

        for(let position of geometry.curveProperty.Curve.segments.LineStringSegment.pos){
            posList.push(getCoordinates(position._text));
        }
        if (posList.length < 2){
            return null;
        }
        return posList;
    }

    toGeoJSON(){
        return turf.lineString(this.coordinates, this.getProperties())
    }

}



export class SurfaceActionPoint extends RouteActionPoint{
    constructor(obj){
        super(obj);
        this.type = 'actionpoint-surface';
        this.coordinates = this.convertCoordinates(obj.geometry) || [[],[]];
    }

    convertCoordinates(geometry){
        const coordinates = geometry.surfaceProperty.Surface.patches.PolygonPatch.exterior.LinearRing.posList._text.split(' ');
        const coordinatePairs = [];

        for(let i = 0; i < coordinates.length-1; i+=2){
            try{
                coordinatePairs.push([parseFloat(coordinates[i+1]),parseFloat(coordinates[i])]);
            }catch(e){
                console.log(`Error: ${e}`);
                return null;
            }
        }
        return coordinatePairs

        
    }

    toGeoJSON(){
        return turf.polygon([this.coordinates], this.getProperties())
    }

}



