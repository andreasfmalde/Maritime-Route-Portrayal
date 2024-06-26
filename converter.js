import { S421toJSON } from "./XMLparser.js";
import * as turf from '@turf/turf';
import { getCoordinates } from "./utility.js";


async function S421ToGeoJSON(filename){
    try{

        const route = await S421toJSON(filename);

        // Convert waypoints to GeoJSON
        let waypoints = [];
        for (let obj of route.Dataset.member){
            if ('RouteWaypoint' in obj){
                const WP = S421RouteWaypointToGeoJSON(obj.RouteWaypoint[0])
                if (WP != null){
                    waypoints.push(WP);
                }
            }
        }
        console.log(waypoints);


    }catch(err){
        console.log(err);
    }
}

// TODO: Some waypoints do not have coordinates, need to handle this
function S421RouteWaypointToGeoJSON(waypoint){
    //console.log(waypoint.geometry[0]);
    
    if (waypoint.geometry[0] instanceof Object){
        const coordinates = getCoordinates(waypoint.geometry[0].pointProperty[0].Point[0].pos[0]);
        return turf.point(coordinates,{
            type: "waypoint",
            id: parseInt(waypoint.routeWaypointID[0]),
            radius: parseFloat(waypoint.routeWaypointTurnRadius[0])
        });
    }
    return null;
}




// Run the code
S421ToGeoJSON('SampleFiles/Cruise_Stavanger_Feistein_Out.s421');
