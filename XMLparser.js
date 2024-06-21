import fs from 'fs';
import { recursiveNamespaceTrimmer } from './utility.js';
import xml2js from 'xml2js';



fs.readFile('./SampleFiles/Cruise_Stavanger_Feistein_Out.s421', 'utf-8', (err, data) => {
    if(err) {
        console.log(err);
    } else {
        const parser = new xml2js.Parser();
        parser.parseString(data, (err, result) => {
            if(err) {
                console.log(err);
            } else {
                recursiveNamespaceTrimmer(result);
                console.log(JSON.stringify(result,null,2))
            }
        });
    }
});


