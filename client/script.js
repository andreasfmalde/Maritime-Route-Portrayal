import {route} from './route.js';
const style = {
    "version": 8,
      "sources": {
      "osm": {
              "type": "raster",
              "tiles": ["https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"],
              "tileSize": 256,
        "attribution": "&copy; ArcGis",
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


map.on('load', () => {
    map.addSource('geojsonSource', {
        'type': 'geojson',
        'data': geojson
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
            'line-color': '#D63F24',
            'line-width': 0.64,
            'line-dasharray':[0,2.2,10,2,10]
        }
    }); 

    map.addLayer({
        'id': 'geojsonLayer',
        'type': 'circle',
        'source': 'geojsonSource',
        'filter': ['==', '$type', 'Point'],
        'paint': {
            'circle-radius': 3,
            'circle-color': '#B42222'
        }
    }); 

    

});