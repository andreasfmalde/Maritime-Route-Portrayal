


export function nameSpaceTrimmer(str){
    return str.split(':').pop();
}

export function recursiveNamespaceTrimmer(obj){
    // Check if obj is an Object or Array

    // Array
    if (Array.isArray(obj)) {
        for (let item of obj) {
            recursiveNamespaceTrimmer(item);
        }
    }
    // Object
    else if (obj instanceof Object){
        let newName;
        for(let key of Object.getOwnPropertyNames(obj)) {
            newName = nameSpaceTrimmer(key);
            if (newName !== key) {
                Object.defineProperty(obj, newName,Object.getOwnPropertyDescriptor(obj, key));
                delete obj[key];
            }
            recursiveNamespaceTrimmer(obj[newName]);
        }
    }
}

// Calculate the angle between two legs defined by 3 waypoints
// IMPORTANT: The second parameter is the waypoint where the legs meet
function calculateRouteLegAngle(wp1=[0,2],wp2=[-1,0],wp3=[0,-2]){
    let leg1 = [wp1[0]-wp2[0],wp1[1]-wp2[1]];
    let leg2 = [wp3[0]-wp2[0],wp3[1]-wp2[1]];

    const dotProduct = leg1[0]*leg2[0] + leg1[1]*leg2[1];
    const leg1Magnitude = Math.sqrt(leg1[0]**2 + leg1[1]**2);
    const leg2Magnitude = Math.sqrt(leg2[0]**2 + leg2[1]**2);

    const angle = Math.acos(dotProduct/(leg1Magnitude*leg2Magnitude));

    const degree =  angle * (180/Math.PI);

    console.log(`Angle: ${degree} degrees | ${angle} radians`);

}


calculateRouteLegAngle([10,-2],[8,0],[10,4]);