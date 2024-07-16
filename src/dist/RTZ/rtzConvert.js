import fs from 'fs';
import { parseXML } from '../utility.js';



class DefaultValues{
    constructor(radius,starboardXTD,portsideXTD,safetyContour,safetyDepth){
        this.radius = radius;
        this.starboardXTD = starboardXTD * 1852;
        this.portsideXTD = portsideXTD * 1852;
        this.safetyContour = safetyContour;
        this.safetyDepth = safetyDepth;
    }
}

function RTZtoGeoJSON(xml){
    const route = parseXML(xml).route;
    // Waypoints

    //console.log(route.waypoints.defaultWaypoint)
    let defaultWaypoint = route.waypoints.defaultWaypoint;
    // Default values
    const defaultValues = new DefaultValues(
        parseFloat(defaultWaypoint._attributes.radius) || 0.0,
        parseFloat(defaultWaypoint.leg._attributes.starboardXTD) || 0.0,
        parseFloat(defaultWaypoint.leg._attributes.portsideXTD) || 0.0,
        parseInt(defaultWaypoint.leg._attributes.safetyContour) || 0,
        parseInt(defaultWaypoint.leg._attributes.safetyDepth) || 0
    );


    for(let waypoint of route.waypoints.waypoint){
        console.log(waypoint)
    }
}


function main(){
    const data = fs.readFileSync('SampleFiles/RTZ/NCA_Stavanger_Feistein_Out_20240322.rtz');
    RTZtoGeoJSON(data.toString('utf8'));
}

main();