
import {nameSpaceTrimmer, recursiveNamespaceTrimmer} from '../utility';

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