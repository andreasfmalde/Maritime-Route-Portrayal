
const style = {
    "version": 8,
      "sources": {
      "osm": {
              "type": "raster",
              "tiles": ["https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"],
              "tileSize": 256,
        "attribution": "&copy; OpenStreetMap Contributors",
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
    center: [5.7, 59], // starting position [lng, lat]
    zoom: 10 // strting zoom
})

import {route }from '../route.js';

map.on('load', () => {
    map.addSource('geojsonSource', {
        'type': 'geojson',
        'data': route
    });

    
    map.addLayer({
        'id': 'geojsonLayerLine',
        'type': 'line',
        'source': 'geojsonSource',
        'filter': ['==', '$type', 'LineString'],
        'layout': {
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
            'line-color': '#000000',
            'line-width': 2
        }
    }); 

    map.addLayer({
        'id': 'geojsonLayer',
        'type': 'circle',
        'source': 'geojsonSource',
        'filter': ['==', '$type', 'Point'],
        'paint': {
            'circle-radius': 6,
            'circle-color': '#B42222'
        }
    }); 

    

});