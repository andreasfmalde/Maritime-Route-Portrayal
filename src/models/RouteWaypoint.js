import * as turf from '@turf/turf';

export class RouteWaypoint{
    constructor(id, radius, routeWaypointLeg="",coordinates){
        this.type = "waypoint";
        this.id = id;
        this.radius = radius;
        this.routeWaypointLeg = routeWaypointLeg;
        this.coordinates = coordinates;
    }

    // Getter methods

    getType(){
        return this.type;
    }
    getId(){
        return this.id;
    }
    getRadius(){
        return this.radius;
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