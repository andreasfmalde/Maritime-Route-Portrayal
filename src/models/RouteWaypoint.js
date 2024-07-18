import { point } from '@turf/turf';

export class RouteWaypoint{
    constructor(id, reference, routeWaypointName, coordinates,
        routeWaypointFixed, routeWaypointTurnRadius,
        routeWaypointLeg, routeWaypointExternalReferenceID,
        routeWaypointExtensions){

        this.id = id;
        this.reference = reference || '';
        if(coordinates[0] === NaN || coordinates[1] === NaN){
            throw new Error("Invalid coordinates");
        }
        this.coordinates = coordinates;
        this.routeWaypointName = routeWaypointName || '';
        this.routeWaypointFixed = routeWaypointFixed || false;
        this.routeWaypointTurnRadius = routeWaypointTurnRadius || 0.0;
        this.routeWaypointLeg = routeWaypointLeg || '';
        this.routeWaypointExternalReferenceID = routeWaypointExternalReferenceID || '';
        this.routeWaypointExtensions = routeWaypointExtensions;
        this.type = "waypoint";

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
        return point(
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