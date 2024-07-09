import {route} from './route.js';
import { createLayers } from '../src/layers.js';
const style = {
    "version": 8,
    "glyphs": "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
      "sources": {
      "osm": {
              "type": "raster",
              "tiles": ["https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"],
              "tileSize": 256,
        "maxzoom": 19
      }
    },
    "layers": [
      {
        "id": "osm",
        "type": "raster",
        "source": "osm" // This must match the source key above
      }
    ]
};


const map = new maplibregl.Map({
    container: 'map', // container id
    style: style, // style URL
    center: [20, 57.5], // starting position [lng, lat]
    zoom: 5 // strting zoom
})

let geojson;

try{
    await fetch('./route.json')
    .then(response => response.json())
    .then(data => {
        if (data == null){
            throw new Error('No data');
        }
        geojson = data;
    });
    document.querySelector('#info').textContent = '';
}catch(e){
    geojson = route;
    document.querySelector('#info').textContent = 'No route.json file found, using default route. Run converter.js to generate a route.json file.';
}


map.on('load', async () => {


    const image = await map.loadImage('assets/1x/RTEWPT01.png');
    const image2 = await map.loadImage('assets/1x/RTEACTPOT01.png');
    const QUESMRK = await map.loadImage('assets/1x/QUESMRK1.png');
    const EMQUESM = await map.loadImage('assets/1x/EMQUESM1.png');

    map.addImage('wpt-img', image.data);
    map.addImage('act-img', image2.data);
    map.addImage('QUESMRK', QUESMRK.data);
    map.addImage('EMQUESM', EMQUESM.data);

    console.log(geojson);
    
    map.addSource('geojsonSource', {
        'type': 'geojson',
        'data': geojson
    });

    const layers = createLayers('geojsonSource');

    for(let layer of layers){
        map.addLayer(layer);
    }
      //
      // DEFAULT LAYERS
      //

      // DEFAULT ACTIONPOINT CURVE LINE
      /*map.addLayer({
        'id': 'actionpoint-curve-line-default',
        'type': 'line',
        'source': 'geojsonSource',
        'filter': ['==', 'type', 'actionpoint-curve'],
        'layout': {
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
            'line-color': '#C045D1',
            'line-width': 0.64,
            'line-dasharray':[0,3.2,3,2,3,2,3,1.4]
        }
      });

      map.addLayer({
        'id':'actionpoint-default-line-symbol',
        'type': 'symbol',
        'source': 'geojsonSource',
        'filter': ['==', 'type', 'actionpoint-curve'],
        'layout': {
            'icon-image': 'EMQUESM',
            'icon-size': 0.4,
            'symbol-placement': 'line',
            'symbol-spacing': 17.6 * 0.64,
            'symbol-avoid-edges': true
        }
      });*/



/*
      // ACTIONPOINT SURFACE AREAFILL DEFAULT
      map.addLayer({
        'id': 'actionpoint-surface-fill-default',
        'type': 'fill',
        'source': 'geojsonSource',
        'filter': ['==', 'type', 'actionpoint-surface'],
        'paint': {
            'fill-pattern': 'QUESMRK',
        }
      });


      // ACTIONPOINT SURFACE LINE DEFAULT
        map.addLayer({
            'id': 'actionpoint-surface-line-default',
            'type': 'line',
            'source': 'geojsonSource',
            'filter': ['==', 'type', 'actionpoint-surface'],
            'layout': {
                'line-join': 'round',
                'line-cap': 'round'
            },
            'paint': {
                'line-color': '#C045D1',
                'line-width': 0.32,
                'line-dasharray':[3.6,1.8]
            }
        });
*/
});