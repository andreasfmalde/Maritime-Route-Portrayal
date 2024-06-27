import fs from 'fs';
import { recursiveNamespaceTrimmer } from './utility.js';
import xml2js from 'xml2js';

function readXML(filename){
    return new Promise((resolve, reject) => {
        fs.readFile(filename, 'utf-8', (err, data) => {
            if(err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}


function XMLtoJSON(data){
    return new Promise((resolve, reject) => {
        const parser = new xml2js.Parser();
        parser.parseString(data, (err, result) => {
            if(err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}


export async function S421toJSON(filename){
    try{
        const xml = await readXML(filename);
        const object = await XMLtoJSON(xml);
        recursiveNamespaceTrimmer(object);
        return object;
    } catch (err) {
        console.log(err);
        return null;
    }
}
