import * as turf from 'https://cdn.jsdelivr.net/npm/@turf/turf@7.0.0/+esm'; // For testing, change to: '@turf/turf'
import { getCoordinates } from '../utility.js';

export class RouteWaypoint{
    constructor(object){
       

        if (Object.keys(object.geometry).length === 0) {
            throw new Error('geometry is required for waypoint');
        }

        const coordinates = getCoordinates(object?.geometry?.pointProperty?.Point?.pos?._text);
        if (coordinates[0] == NaN || coordinates[1] == NaN) {
            throw new Error(' invalid coordinates');
        }
        this.coordinates = coordinates;
        this.type = "waypoint";
        this.reference = object?._attributes?.id || '';
        this.id = parseInt(object?.routeWaypointID?._text);
        this.routeWaypointName = object?.routeWaypointName?._text || '';
        this.routeWaypointFixed = object?.routeWaypointFixed?._text === 'true' ? true : false;
        this.routeWaypointTurnRadius = parseFloat(object?.routeWaypointTurnRadius?._text) || 0.0;
        this.routeWaypointLeg = object?.routeWaypointLeg?._attributes?.href?.split('#')[1] || '';
        this.routeWaypointExternalReferenceID = object?.routeWaypointExternalReferenceID?._text || '';
        this.routeWaypointExtensions = {};

        if(object?.routeWaypointExtensions instanceof Object){
            this.routeWaypointLegExtensions = {
                manufacturerId: object?.routeWaypointExtensions?._attributes?.routeExtensionsManufacturerId || '',
                routeExtensionsName: object?.routeWaypointExtensions?._attributes?.routeExtensionsName || '',
                version: parseInt(object?.routeWaypointExtensions?._attributes?.routeExtensionsVersion) || 0,
                note: object?.routeWaypointExtensions?.routeExtensionsNote?._text || ''
            }
        }

    }

    // Getter methods

    getType(){
        return this.type;
    }
    getId(){
        return this.id;
    }
    getRadius(){
        return this.routeWaypointTurnRadius;
    }
    getRouteWaypointLeg(){
        return this.routeWaypointLeg;
    }
    getCoordinates(){
        return this.coordinates;
    }


    // Setter methods
    setRouteWaypointLeg(routeWaypointLeg){
        this.routeWaypointLeg = routeWaypointLeg;
    }

    setCoordinates(coordinates){
        this.coordinates = coordinates;
    }

    

    // Ordinary methods

    toGeoJSON(){
        return turf.point(
            this.coordinates,
            {
                type: this.type,
                id: this.id,
                radius: this.radius,
                routeWaypointLeg: this.routeWaypointLeg
            }
        )
    }
}