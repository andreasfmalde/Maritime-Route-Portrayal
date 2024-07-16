import {
    point, bearing, transformScale, transformTranslate,
    lineString, polygon, lineIntersect, distance, nearestPointOnLine
} from 'https://cdn.jsdelivr.net/npm/@turf/turf@7.0.0/+esm'; // For testing, change to: '@turf/turf'

export class RouteWaypointLeg{
    constructor(
        id, routeWaypointLegStarboardXTDL, routeWaypointLegPortXTDL,
        routeWaypointLegStarboardCL, routeWaypointLegPortCL, routeWaypointLegSafetyContour,
        routeWaypointLegSafetyDepth, routeWaypointLegGeometryType, routeWaypointLegSOGMin,
        routeWaypointLegSOGMax, routeWaypointLegSTWMin, routeWaypointLegSTWMax, routeWaypointLegDraft,
        routeWaypointLegDraftForward, routeWaypointLegDraftAft, routeWaypointLegDraftMax, routeWaypointLegAirDraftMax,
        routeWaypointLegBeamMax, routeWaypointLegLengthMax, routeWaypointLegStaticUKC, routeWaypointLegDynamicUKC,
        routeWaypointLegSafetyMargin, routeWaypointLegNote, routeWaypointLegIssue, routeWaypointLegExtensions
    ){
        this.id = id;
        this.legCoordinates = [[],[]];
        this.routeWaypointLegStarboardXTDL = routeWaypointLegStarboardXTDL;
        this.routeWaypointLegPortXTDL = routeWaypointLegPortXTDL;
        this.routeWaypointLegStarboardCL = routeWaypointLegStarboardCL;
        this.routeWaypointLegPortCL = routeWaypointLegPortCL;
        this.routeWaypointLegSafetyContour = routeWaypointLegSafetyContour;
        this.routeWaypointLegSafetyDepth = routeWaypointLegSafetyDepth;
        this.routeWaypointLegGeometryType = routeWaypointLegGeometryType;
        this.routeWaypointLegSOGMin = routeWaypointLegSOGMin;
        this.routeWaypointLegSOGMax = routeWaypointLegSOGMax;
        this.routeWaypointLegSTWMin = routeWaypointLegSTWMin;
        this.routeWaypointLegSTWMax = routeWaypointLegSTWMax;
        this.routeWaypointLegDraft = routeWaypointLegDraft;
        this.routeWaypointLegDraftForward = routeWaypointLegDraftForward;
        this.routeWaypointLegDraftAft = routeWaypointLegDraftAft;
        this.routeWaypointLegDraftMax = routeWaypointLegDraftMax;
        this.routeWaypointLegAirDraftMax = routeWaypointLegAirDraftMax;
        this.routeWaypointLegBeamMax = routeWaypointLegBeamMax;
        this.routeWaypointLegLengthMax = routeWaypointLegLengthMax;
        this.routeWaypointLegStaticUKC = routeWaypointLegStaticUKC;
        this.routeWaypointLegDynamicUKC =  routeWaypointLegDynamicUKC;
        this.routeWaypointLegSafetyMargin = routeWaypointLegSafetyMargin;
        this.routeWaypointLegNote = routeWaypointLegNote;
        this.routeWaypointLegIssue = routeWaypointLegIssue;
        this.type = 'route-leg';
        this.routeWaypointLegExtensions = routeWaypointLegExtensions;
    }


    getId(){
        return this.id;
    }

    getCoordinates(){
        return this.legCoordinates;
    }

    getStarboardXTDL(){
        return this.routeWaypointLegStarboardXTDL;
    }

    getPortXTDL(){
        return this.routeWaypointLegPortXTDL;
    }

    getStarboardCL(){
        return this.routeWaypointLegStarboardCL;
    }

    getPortCL(){
        return this.routeWaypointLegPortCL;
    }


    setCoordinates(coordinates){
        this.legCoordinates = coordinates;
    }

    appendLegLineCoordinates(coordinates){
        let distance1 = distance(point(coordinates[1]),point(this.legCoordinates[0]));
        let distance2 = distance(point(coordinates[1]),point(this.legCoordinates[this.legCoordinates.length-1]));

        if(distance2 < distance1){
            this.legCoordinates.reverse();
        }
        coordinates.splice(coordinates.length-1,1);
        this.legCoordinates.unshift(...coordinates);
    }

    toGeoJSON(){
        return lineString(this.legCoordinates, {
            id: this.id,
            type: this.type,
            routeWaypointLegStarboardXTDL: this.routeWaypointLegStarboardXTDL,
            routeWaypointLegPortXTDL: this.routeWaypointLegPortXTDL,
            routeWaypointLegStarboardCL: this.routeWaypointLegStarboardCL,
            routeWaypointLegPortCL: this.routeWaypointLegPortCL,
            routeWaypointLegSafetyContour: this.routeWaypointLegSafetyContour,
            routeWaypointLegSafetyDepth: this.routeWaypointLegSafetyDepth,
            routeWaypointLegGeometryType: this.routeWaypointLegGeometryType,
            routeWaypointLegSOGMin: this.routeWaypointLegSOGMin,
            routeWaypointLegSOGMax: this.routeWaypointLegSOGMax,
            routeWaypointLegSTWMin: this.routeWaypointLegSTWMin,
            routeWaypointLegSTWMax: this.routeWaypointLegSTWMax,
            routeWaypointLegDraft: this.routeWaypointLegDraft,
            routeWaypointLegDraftForward: this.routeWaypointLegDraftForward,
            routeWaypointLegDraftAft: this.routeWaypointLegDraftAft,
            routeWaypointLegDraftMax: this.routeWaypointLegDraftMax,
            routeWaypointLegAirDraftMax: this.routeWaypointLegAirDraftMax,
            routeWaypointLegBeamMax: this.routeWaypointLegBeamMax,
            routeWaypointLegLengthMax: this.routeWaypointLegLengthMax,
            routeWaypointLegStaticUKC: this.routeWaypointLegStaticUKC,
            routeWaypointLegDynamicUKC: this.routeWaypointLegDynamicUKC,
            routeWaypointLegSafetyMargin: this.routeWaypointLegSafetyMargin,
            routeWaypointLegNote: this.routeWaypointLegNote,
            routeWaypointLegIssue: this.routeWaypointLegIssue,
            routeWaypointLegExtensions: this.routeWaypointLegExtensions
        });
    }


    starboardXTDLtoGeoJSON(){
        const offset = this.offsetLine(this.toGeoJSON(),this.getStarboardXTDL());
        offset.properties ={
            type: "route-leg-XTDL",
            routeLegID: this.id,
            side: "starboard",
            distance: Math.abs(this.getStarboardXTDL())
        }
        return offset;
    }

    portXTDLtoGeoJSON(){
        const offset = this.offsetLine(this.toGeoJSON(),-this.getPortXTDL());
        offset.properties ={
            type: "route-leg-XTDL",
            routeLegID: this.id,
            side: "port",
            distance: Math.abs(this.getPortXTDL())
        }
        return offset;
    }


    starboardCLtoGeoJSON(){
        const offset = this.offsetLine(this.toGeoJSON(),this.getStarboardCL());
        offset.properties ={
            type: "route-leg-CL",
            routeLegID: this.id,
            side: "starboard",
            distance: Math.abs(this.getStarboardCL())
        }
        return offset;
    }

    portCLtoGeoJSON(){
        const offset = this.offsetLine(this.toGeoJSON(),-this.getPortCL());
        offset.properties ={
            type: "route-leg-CL",
            routeLegID: this.id,
            side: "port",
            distance: Math.abs(this.getPortCL())
        }
        return offset;
    }

    offsetLine(line, distance){
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


    static updateLegCorridors(list){
        let last = list[list.length-1];
        let secondLast = list[list.length-2];
        let length, index, number;;
        const backCoordinate = point(secondLast.geometry.coordinates[secondLast.geometry.coordinates.length-1]); 
    
        if(last.properties.distance !== secondLast.properties.distance){
            let secondLinePoint = point(last.geometry.coordinates[1]);
    
            if(distance(point(secondLast.geometry.coordinates[1]),secondLinePoint) <
            distance(backCoordinate,secondLinePoint)){
                length = secondLast.geometry.coordinates.length;
                number = length-2;
                secondLast.geometry.coordinates.splice(2,number);
            }
            secondLast.geometry.coordinates.push(last.geometry.coordinates[0]);
        }
        else{
            let closestPoint = nearestPointOnLine(secondLast, last.geometry.coordinates[1]);
            length = secondLast.geometry.coordinates.length;
            index = closestPoint.properties.index;
            number = length-index-1;
            secondLast.geometry.coordinates.splice(index+1,number);
            last.geometry.coordinates[0] = secondLast.geometry.coordinates[secondLast.geometry.coordinates.length-1];
        }
    }

    static createCorridorPolygons(starboardLine, portLine){
        const coordinates = [];
        let reverseArray = [...portLine.geometry.coordinates].reverse();
        coordinates.push(...starboardLine.geometry.coordinates)
        coordinates.push(starboardLine.geometry.coordinates[starboardLine.geometry.coordinates.length-1],reverseArray[0]);
        coordinates.push(...reverseArray);
        coordinates.push(reverseArray[reverseArray.length-1],starboardLine.geometry.coordinates[0]);

        let type = starboardLine.properties.type === "route-leg-XTDL" ? "route-leg-corridor-xtdl" : "route-leg-corridor-cl";
        return polygon([coordinates],{
            type: type,
            routeLegID: portLine.properties.routeLegID,
            starboardDistance: starboardLine.properties.distance,
            portDistance: portLine.properties.distance
        });
    }

}