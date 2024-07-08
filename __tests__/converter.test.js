import {
    convertTo360_TEST, convertToNorthBearing_TEST,
    calculateMidLineBearing_TEST
} from "../src/converter";


describe('convertTo360 tests', ()=>{
    test('bearings between 0 and 180 degrees stay the same',()=>{
        let degrees = [45.323,59,180,0,90.45533];
        let expectedResult = [45.323,59,180,0,90.45533];
        for(let i = 0; i < degrees.length; i++){
            expect(convertTo360_TEST(degrees[i])).toBe(expectedResult[i]);
            expect(convertTo360_TEST(degrees[i])).toBeGreaterThanOrEqual(0);
            expect(convertTo360_TEST(degrees[i])).toBeLessThanOrEqual(180);
        }
    });

    test('bearings between -180 and 0 are converted to a values bewteen 180 and 360',()=>{
        let degrees = [-90.45, -178.5, -1, -20.555,-180];
        let expectedResult = [269.55, 181.5, 359, 339.445,180];
        for(let i = 0; i < degrees.length; i++){
            expect(convertTo360_TEST(degrees[i])).toBe(expectedResult[i]);
            expect(convertTo360_TEST(degrees[i])).toBeGreaterThanOrEqual(180);
            expect(convertTo360_TEST(degrees[i])).toBeLessThanOrEqual(360);
        }
    });

    test('invalid bearings throws an error',()=>{
        let degrees = [-190, 190, 361, -181];
        for(let i = 0; i < degrees.length; i++){
            expect(()=>{convertTo360_TEST(degrees[i])}).toThrow();
        }
    });

});


describe('convertToNorthBearing tests', ()=>{
    test('bearings between 0 and 180 degrees stay the same',()=>{
        let degrees = [45.323,59,180,0,90.45533];
        let expectedResult = [45.323,59,180,0,90.45533];
        for(let i = 0; i < degrees.length; i++){
            expect(convertToNorthBearing_TEST(degrees[i])).toBe(expectedResult[i]);
            expect(convertToNorthBearing_TEST(degrees[i])).toBeGreaterThanOrEqual(0);
            expect(convertToNorthBearing_TEST(degrees[i])).toBeLessThanOrEqual(180);
        }
    });

    test('bearings between 180 and 360 are converted to a values bewteen -180 and 0',()=>{
        let degrees = [200.334, 181, 330, 359];
        let expectedResult = [-159.666, -179, -30, -1];
        for(let i = 0; i < degrees.length; i++){
            expect(convertToNorthBearing_TEST(degrees[i])).toBe(expectedResult[i]);
            expect(convertToNorthBearing_TEST(degrees[i])).toBeGreaterThanOrEqual(-180);
            expect(convertToNorthBearing_TEST(degrees[i])).toBeLessThanOrEqual(0);
        }
    });

    test('bearings below 0 and above 360 still get converted',()=>{
        let degrees = [-90.45, -178.5, -1, -20.555,-180, 361, 370];
        let expectedResult = [-90.45, -178.5, -1, -20.555,-180, 1, 10];
        for(let i = 0; i < degrees.length; i++){
            expect(convertToNorthBearing_TEST(degrees[i])).toBe(expectedResult[i]);
            expect(convertToNorthBearing_TEST(degrees[i])).toBeGreaterThanOrEqual(-180);
            expect(convertToNorthBearing_TEST(degrees[i])).toBeLessThanOrEqual(180);
        }
    });
});

describe('calculateMidLineBearing tests', ()=>{
    test('the middle angle is returned from bearings between 0 and 180 degrees', ()=>{
        let bearing1 = 45;
        let bearing2 = 135;
        let expectedResult = 90;
        expect(calculateMidLineBearing_TEST(bearing1, bearing2)).toBe(expectedResult);
        bearing1 = 10;
        bearing2 = 166;
        expectedResult = 88;
        expect(calculateMidLineBearing_TEST(bearing1, bearing2)).toBe(expectedResult);
    });
    test('the middle angle is returned from bearings between -180 and 0 degrees', ()=>{
        let bearing1 = -30;
        let bearing2 = -160;
        let expectedResult = -95;
        expect(calculateMidLineBearing_TEST(bearing1, bearing2)).toBe(expectedResult);
        bearing1 = -160;
        bearing2 = -60;
        expectedResult = -110;
        expect(calculateMidLineBearing_TEST(bearing1, bearing2)).toBe(expectedResult);
    });

    test('the middle angle is returned from bearings between -90 and 90 degrees', ()=>{
        let bearing1 = -30;
        let bearing2 = 60;
        let expectedResult = 15;
        expect(calculateMidLineBearing_TEST(bearing1, bearing2)).toBe(expectedResult);
        bearing1 = -78;
        bearing2 = 24;
        expectedResult = -27;
        expect(calculateMidLineBearing_TEST(bearing1, bearing2)).toBe(expectedResult);
        bearing1 = -120;
        bearing2 = 120;
        expectedResult = 180;
        expect(calculateMidLineBearing_TEST(bearing1, bearing2)).toBe(expectedResult);
        bearing1 = -155;
        bearing2 = 95;
        expectedResult = 150;
        expect(calculateMidLineBearing_TEST(bearing1, bearing2)).toBe(expectedResult);
    });

});