import { point } from 'https://cdn.jsdelivr.net/npm/@turf/turf@7.0.0/+esm'; // For testing, change to: '@turf/turf'

export class RouteWaypoint{
    constructor(id, reference, routeWaypointName, coordinates,
        routeWaypointFixed, routeWaypointTurnRadius,
        routeWaypointLeg, routeWaypointExternalReferenceID,
        routeWaypointExtensions){

        this.id = id;
        this.reference = reference;
        this.coordinates = coordinates;
        this.routeWaypointName = routeWaypointName;
        this.routeWaypointFixed = routeWaypointFixed;
        this.routeWaypointTurnRadius = routeWaypointTurnRadius;
        this.routeWaypointLeg = routeWaypointLeg;
        this.routeWaypointExternalReferenceID = routeWaypointExternalReferenceID;
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