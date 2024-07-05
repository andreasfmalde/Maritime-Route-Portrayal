import * as turf from '@turf/turf';

export class RouteWaypointLeg{
    constructor(object){
        this.id = object._attributes.id;
        this.legCoordinates = [[],[]];
        this.routeWaypointLegStarboardXTDL = parseInt(object?.routeWaypointLegStarboardXTDL?._text) || 0;
        this.routeWaypointLegPortXTDL = parseInt(object?.routeWaypointLegPortXTDL?._text) || 0;
        this.routeWaypointLegStarboardCL = parseInt(object?.routeWaypointLegStarboardCL?._text) || 0;
        this.routeWaypointLegPortCL = parseInt(object?.routeWaypointLegPortCL?._text) || 0;
        this.routeWaypointLegSafetyContour = parseFloat(object?.routeWaypointLegSafetyContour?._text) || 0.0;
        this.routeWaypointLegSafetyDepth = parseFloat(object?.routeWaypointLegSafetyDepth?._text) || 0.0;
        this.routeWaypointLegGeometryType = parseInt(object?.routeWaypointLegGeometryType?._text) || 1;
        this.routeWaypointLegSOGMin = parseFloat(object?.routeWaypointLegSOGMin?._text) || 0.0;
        this.routeWaypointLegSOGMax = parseFloat(object?.routeWaypointLegSOGMax?._text) || 0.0;
        this.routeWaypointLegSTWMin = parseFloat(object?.routeWaypointLegSTWMin?._text) || 0.0;
        this.routeWaypointLegSTWMax = parseFloat(object?.routeWaypointLegSTWMax?._text) || 0.0;
        this.routeWaypointLegDraft = parseFloat(object?.routeWaypointLegDraft?._text) || 0.0;
        this.routeWaypointLegDraftForward = parseFloat(object?.routeWaypointLegDraftForward?._text) || 0.0;
        this.routeWaypointLegDraftAft = parseFloat(object?.routeWaypointLegDraftAft?._text) || 0.0;
        this.routeWaypointLegDraftMax = parseFloat(object?.routeWaypointLegDraftMax?._text) || 0.0;
        this.routeWaypointLegAirDraftMax = parseFloat(object?.routeWaypointLegAirDraftMax?._text) || 0.0;
        this.routeWaypointLegBeamMax = parseFloat(object?.routeWaypointLegBeamMax?._text) || 0.0;
        this.routeWaypointLegLengthMax = parseFloat(object?.routeWaypointLegLengthMax?._text) || 0.0;
        this.routeWaypointLegStaticUKC = parseFloat(object?.routeWaypointLegStaticUKC?._text) || 0.0;
        this.routeWaypointLegDynamicUKC = parseFloat(object?.routeWaypointLegDynamicUKC?._text) || 0.0;
        this.routeWaypointLegSafetyMargin = parseFloat(object?.routeWaypointLegSafetyMargin?._text) || 0.0;
        this.routeWaypointLegNote = object?.routeWaypointLegNote?._text || '';
        this.routeWaypointLegIssue = object?.routeWaypointLegIssue?._text || '';
        this.type = 'route-leg';
        this.routeWaypointLegExtensions = {};

        if(object?.routeWaypointLegExtensions instanceof Object){
            this.routeWaypointLegExtensions = {
                manufacturerId: object?.routeWaypointLegExtensions?._attributes?.routeExtensionsManufacturerId || '',
                routeExtensionsName: object?.routeWaypointLegExtensions?._attributes?.routeExtensionsName || '',
                version: parseInt(object?.routeWaypointLegExtensions?._attributes?.routeExtensionsVersion) || 0,
                note: object?.routeWaypointLegExtensions?.routeExtensionsNote?._text || ''
            }
        }
    }


    getId(){
        return this.id;
    }

    getCoordinates(){
        return this.legCoordinates;
    }


    setCoordinates(coordinates){
        this.legCoordinates = coordinates;
    }

    appendLegLineCoordinates(coordinates){
        let distance1 = turf.distance(turf.point(coordinates[1]),turf.point(this.legCoordinates[0]));
        let distance2 = turf.distance(turf.point(coordinates[1]),turf.point(this.legCoordinates[this.legCoordinates.length-1]));

        if(distance2 < distance1){
            this.legCoordinates.reverse();
        }
        coordinates.splice(coordinates.length-1,1);
        this.legCoordinates.unshift(...coordinates);
    }

    toGeoJSON(){
        return turf.lineString(this.legCoordinates, {
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

}