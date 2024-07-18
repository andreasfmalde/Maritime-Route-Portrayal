
import {nameSpaceTrimmer, recursiveNamespaceTrimmer, getCoordinates} from '../src/utility';

describe('nameSpaceTrimmer tests', ()=>{
    test('colon and text before the colon is removed from the string',()=>{
        const str = "namespace:element";
        const expectedResult = "element";
        expect(nameSpaceTrimmer(str)).toBe(expectedResult);
    });

    test('string stays the same if it does not contain a colon',()=>{
        let str = "this is some text";
        expect(nameSpaceTrimmer(str)).toBe(str);

        str = "";
        expect(nameSpaceTrimmer(str)).toBe("");
        
    });

});

describe('recursiveNamespaceTrimmer tests', ()=>{
    test('namespaces of object properties are trimmed recursively',()=>{
        const obj = {
            "namespace:element": {
                "namespace:element2": "element2",
                "namespace:element3": "element3"
            }
        };
        const expectedResult = {
            "element": {
                "element2": "element2",
                "element3": "element3"
            }
        };
        recursiveNamespaceTrimmer(obj);
        expect(obj).toEqual(expectedResult);
    });

    test('arrays are enumerated and object properties are trimmed recursively',()=>{
        const obj = {
            "namespace:element": [
                {
                    "namespace:element2": "element2",
                    "namespace:element3": "element3"
                },
                {
                    "namespace:element4": "element4",
                    "namespace:element5": "element5"
                }
            ]
        };
        const expectedResult = {
            "element": [
                {
                    "element2": "element2",
                    "element3": "element3"
                },
                {
                    "element4": "element4",
                    "element5": "element5"
                }
            ]
        };
        recursiveNamespaceTrimmer(obj);
        expect(obj).toEqual(expectedResult);
    });
    
});


describe('getCoordinates tests', ()=>{
    test('coordinates are extracted from a string and in the right order',()=>{
        const point = "10 20";
        const expectedResult = [20,10];
        expect(getCoordinates(point)).toEqual(expectedResult);
        expect(getCoordinates(point)).not.toEqual([10,20]);
    });
    test('returns NaN for non-numeric values',()=>{
        let point = "10 a";
        let expectedResult = [NaN,10];
        expect(getCoordinates(point)).toEqual(expectedResult);
        point = "b c";
        expectedResult = [NaN,NaN];
        expect(getCoordinates(point)).toEqual(expectedResult);
    });
    test('coordinates are extracted from a string with multiple spaces',()=>{
        const point = "10  20";
        const expectedResult = [20,10];
        expect(getCoordinates(point)).toEqual(expectedResult);
    });

    test('coordinates that contain more than two values will be set to [NaN,NaN]',()=>{
        const point = "10 20 30";
        const expectedResult = [NaN,NaN];
        expect(getCoordinates(point)).toEqual(expectedResult);
    });
});