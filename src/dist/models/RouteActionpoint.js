import {point, lineString, polygon}  from 'https://cdn.jsdelivr.net/npm/@turf/turf@7.0.0/+esm'; // For testing, change to: '@turf/turf'
class RouteActionPoint{
    constructor(id, routeActionPointID, routeActionPointName, routeActionPointRadius,
        routeActionPointTimeToAct, routeActionPointRequiredAction, routeActionPointRequiredActionDescription,
        routeActionPointExtensions){
        this.id = id;
        this.routeActionPointID = routeActionPointID;
        this.routeActionPointName = routeActionPointName;
        this.routeActionPointRadius = routeActionPointRadius;
        this.routeActionPointTimeToAct = routeActionPointTimeToAct;
        this.routeActionPointRequiredAction = routeActionPointRequiredAction;
        this.routeActionPointRequiredActionDescription = routeActionPointRequiredActionDescription;
        this.routeActionPointExtensions = routeActionPointExtensions;
        this.coordinates = [];
        this.type = 'actionpoint';
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
    constructor(id, routeActionPointID, routeActionPointName, coordinates, routeActionPointRadius,
        routeActionPointTimeToAct, routeActionPointRequiredAction, routeActionPointRequiredActionDescription,
        routeActionPointExtensions){
        super(id, routeActionPointID, routeActionPointName, routeActionPointRadius,
            routeActionPointTimeToAct, routeActionPointRequiredAction, routeActionPointRequiredActionDescription,
            routeActionPointExtensions);
        this.type = 'actionpoint-point';
        this.coordinates = coordinates || [];
    }

    toGeoJSON(){
        return point(this.coordinates, this.getProperties())
    }
}




export class CurveActionPoint extends RouteActionPoint{
    constructor(id, routeActionPointID, routeActionPointName, coordinates, routeActionPointRadius,
        routeActionPointTimeToAct, routeActionPointRequiredAction, routeActionPointRequiredActionDescription,
        routeActionPointExtensions){
        super(id, routeActionPointID, routeActionPointName, routeActionPointRadius,
            routeActionPointTimeToAct, routeActionPointRequiredAction, routeActionPointRequiredActionDescription,
            routeActionPointExtensions);
        this.type = 'actionpoint-curve';
        this.coordinates = coordinates || [[],[]];
    }

    toGeoJSON(){
        return lineString(this.coordinates, this.getProperties())
    }

}



export class SurfaceActionPoint extends RouteActionPoint{
    constructor(id, routeActionPointID, routeActionPointName, coordinates, routeActionPointRadius,
        routeActionPointTimeToAct, routeActionPointRequiredAction, routeActionPointRequiredActionDescription,
        routeActionPointExtensions){
        super(id, routeActionPointID, routeActionPointName, routeActionPointRadius,
            routeActionPointTimeToAct, routeActionPointRequiredAction, routeActionPointRequiredActionDescription,
            routeActionPointExtensions);
        this.type = 'actionpoint-surface';
        this.coordinates = coordinates || [[],[]];
    }

    toGeoJSON(){
        return polygon([this.coordinates], this.getProperties())
    }

}


export function createActionPoint(type, id, routeActionPointID, routeActionPointName, coordinates, routeActionPointRadius,
    routeActionPointTimeToAct, routeActionPointRequiredAction, routeActionPointRequiredActionDescription,
    routeActionPointExtensions ){
    switch(type){
        case "point":
            return new PointActionPoint(id, routeActionPointID, routeActionPointName, coordinates, routeActionPointRadius,
                routeActionPointTimeToAct, routeActionPointRequiredAction, routeActionPointRequiredActionDescription,
                routeActionPointExtensions);
        case "curve":
            return new CurveActionPoint(id, routeActionPointID, routeActionPointName, coordinates, routeActionPointRadius,
                routeActionPointTimeToAct, routeActionPointRequiredAction, routeActionPointRequiredActionDescription,
                routeActionPointExtensions);
        case "surface":
            return new SurfaceActionPoint(id, routeActionPointID, routeActionPointName, coordinates, routeActionPointRadius,
                routeActionPointTimeToAct, routeActionPointRequiredAction, routeActionPointRequiredActionDescription,
                routeActionPointExtensions);
    }
}
