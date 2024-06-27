import fs from 'fs';
import { recursiveNamespaceTrimmer } from './utility.js';
import xmljs from 'xml-js';

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


export async function S421toJSON(filename){
    try{
        const xml = await readXML(filename);
        const object = JSON.parse(xmljs.xml2json(xml, {compact: true, spaces: 4}));
        recursiveNamespaceTrimmer(object);
        return object;
    } catch (err) {
        console.log(err);
        return null;
    }
}
