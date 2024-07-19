import { RouteWaypointLeg } from "../src/models";


describe('RouteWaypointLeg tests', () => {

    let leg;

    beforeEach(() => {
        const id = 'RTE.WPT.LEG.1';
        const routeWaypointLegStarboardXTDL = 200 ;
        const routeWaypointLegPortXTDL= 200;
        const routeWaypointLegStarboardCL= 300;
        const routeWaypointLegPortCL= 300;
        const routeWaypointLegSafetyContour = 10;
        const routeWaypointLegSafetyDepth = 20;
        const routeWaypointLegGeometryType = 1;
        const routeWaypointLegSOGMin = 1.0;
        const routeWaypointLegSOGMax = 1.0;
        const routeWaypointLegSTWMin = 1.0;
        const routeWaypointLegSTWMax = 1.0;
        const routeWaypointLegDraft = 1.0;
        const routeWaypointLegDraftForward = 1.0;
        const routeWaypointLegDraftAft = 1.0;
        const routeWaypointLegDraftMax = 1.0;
        const routeWaypointLegAirDraftMax = 1.0;
        const routeWaypointLegBeamMax = 1.0;
        const routeWaypointLegLengthMax = 1.0;
        const routeWaypointLegStaticUKC = 1.0;
        const routeWaypointLegDynamicUKC = 1.0;
        const routeWaypointLegSafetyMargin = 1.0;
        const routeWaypointLegNote = 'A note';
        const routeWaypointLegIssue = 'An issue message';
        const routeWaypointLegExtensions = {};


        leg = new RouteWaypointLeg(
            id, routeWaypointLegStarboardXTDL, routeWaypointLegPortXTDL,
            routeWaypointLegStarboardCL, routeWaypointLegPortCL,
            routeWaypointLegSafetyContour, routeWaypointLegSafetyDepth,
            routeWaypointLegGeometryType, routeWaypointLegSOGMin,
            routeWaypointLegSOGMax, routeWaypointLegSTWMin, routeWaypointLegSTWMax,
            routeWaypointLegDraft, routeWaypointLegDraftForward, routeWaypointLegDraftAft,
            routeWaypointLegDraftMax, routeWaypointLegAirDraftMax, routeWaypointLegBeamMax,
            routeWaypointLegLengthMax, routeWaypointLegStaticUKC, routeWaypointLegDynamicUKC,
            routeWaypointLegSafetyMargin, routeWaypointLegNote, routeWaypointLegIssue,
            routeWaypointLegExtensions);
    });

    test('RouteWaypointLeg constructor',()=>{

        expect(leg.id).toBe('RTE.WPT.LEG.1');
        expect(leg.routeWaypointLegStarboardXTDL).toBe(200);
        expect(leg.routeWaypointLegPortXTDL).toBe(200);
        expect(leg.routeWaypointLegStarboardCL).toBe(300);
        expect(leg.routeWaypointLegPortCL).toBe(300);
        expect(leg.routeWaypointLegSafetyContour).toBe(10);
        expect(leg.routeWaypointLegSafetyDepth).toBe(20);
        expect(leg.routeWaypointLegGeometryType).toBe(1);
        expect(leg.routeWaypointLegSOGMin).toBe(1.0);
        expect(leg.routeWaypointLegSOGMax).toBe(1.0);
        expect(leg.routeWaypointLegSTWMin).toBe(1.0);
        expect(leg.routeWaypointLegSTWMax).toBe(1.0);
        expect(leg.routeWaypointLegDraft).toBe(1.0);
        expect(leg.routeWaypointLegDraftForward).toBe(1.0);
        expect(leg.routeWaypointLegDraftAft).toBe(1.0);
        expect(leg.routeWaypointLegDraftMax).toBe(1.0);
        expect(leg.routeWaypointLegAirDraftMax).toBe(1.0);
        expect(leg.routeWaypointLegBeamMax).toBe(1.0);
        expect(leg.routeWaypointLegLengthMax).toBe(1.0);
        expect(leg.routeWaypointLegStaticUKC).toBe(1.0);
        expect(leg.routeWaypointLegDynamicUKC).toBe(1.0);
        expect(leg.routeWaypointLegSafetyMargin).toBe(1.0);
        expect(leg.routeWaypointLegNote).toBe('A note');
        expect(leg.routeWaypointLegIssue).toBe('An issue message');
        expect(leg.routeWaypointLegExtensions).toEqual({});
        expect(leg.type).toBe("route-leg");
        expect(leg.legCoordinates).toEqual([[],[]]);

    });

    test('RouteWaypointLeg constructor with invalid id',()=>{
        expect(()=>new RouteWaypointLeg(
            undefined, 200, 200,
            300, 300,
            10, 20,
            1, 1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,'', '',
            {})).toThrowError("Invalid id");
        
        expect(()=>new RouteWaypointLeg(
            '', 200, 200,
            300, 300,
            10, 20,
            1, 1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,'', '',
            {})).toThrowError("Invalid id");

        expect(()=>new RouteWaypointLeg(
            null, 200, 200,
            300, 300,
            10, 20,
            1, 1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,'', '',
            {})).toThrowError("Invalid id");
    });

    test('getter and setter methods',()=>{
        expect(leg.getId()).toBe('RTE.WPT.LEG.1');
        expect(leg.getCoordinates()).toEqual([[],[]]);
        expect(leg.getStarboardXTDL()).toBe(200);
        expect(leg.getPortXTDL()).toBe(200);
        expect(leg.getStarboardCL()).toBe(300);
        expect(leg.getPortCL()).toBe(300);

        // Setter methods
        expect(()=> leg.appendLegLineCoordinates([[5,3],[-2,-2]]))
        .toThrowError('No coordinates to append to');
        leg.setCoordinates([[1,2],[3,4]]);
        expect(leg.getCoordinates()).toEqual([[1,2],[3,4]]);
        leg.appendLegLineCoordinates([[5,3],[-2,-2]]);
        expect(leg.getCoordinates()).toEqual([[5,3],[1,2],[3,4]]);
        leg.appendLegLineCoordinates([[7,8],[2,3]]);
        expect(leg.getCoordinates()).toEqual([[7,8],[3,4],[1,2],[5,3]]);
    });


    test('toGeoJSON method',()=>{
        leg.setCoordinates([[1,2],[3,4]]);
        const geoJSON = leg.toGeoJSON();
        expect(geoJSON.type).toBe('Feature');
        expect(geoJSON.properties.id).toBe('RTE.WPT.LEG.1');
        expect(geoJSON.geometry.type).toBe('LineString');
        expect(geoJSON.geometry.coordinates).toEqual([[1,2],[3,4]]);
        expect(geoJSON.properties.type).toBe('route-leg');
        expect(geoJSON.properties.routeWaypointLegStarboardXTDL).toBe(200);
        expect(geoJSON.properties.routeWaypointLegPortXTDL).toBe(200);
        expect(geoJSON.properties.routeWaypointLegStarboardCL).toBe(300);
        expect(geoJSON.properties.routeWaypointLegPortCL).toBe(300);
        expect(geoJSON.properties.routeWaypointLegIssue).toEqual('An issue message');
    })
});