import {route} from './route.js';
const style = {
    "version": 8,
    "glyphs": "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
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

    map.addImage('wpt-img', image.data);
    map.addImage('act-img', image2.data);


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
        'id': 'waypoint-symbol',
        'type': 'symbol',
        'source': 'geojsonSource',
        'filter': ['==', 'type', 'waypoint'],
        'layout': {
            'icon-image': 'wpt-img',
            'icon-size': 0.5
        }

    });
    map.addLayer({
        'id':'actionpoint-symbol',
        'type': 'symbol',
        'source': 'geojsonSource',
        'filter': ['==', 'type', 'actionpoint'],
        'layout': {
            'icon-image': 'act-img',
            'icon-size': 0.6,
            'text-field': ['get', 'routeActionPointRequiredActionDescription'],
            'text-font': ['Open Sans Regular', 'Arial Unicode MS Regular'],
            'text-size': 10,
            'text-anchor': 'bottom-left',
            'text-offset': [0, 2],
        },
        'paint': {
            'text-color': '#AA44A8',
            'text-opacity': 0.5,
        }
    });

    /*
    map.addLayer({
        'id': 'text-layer',
        'type': 'symbol',
        'source': 'geojsonSource',
        'layout': {
          'text-field': "Hello",
          "text-font": ["Open Sans Regular", "Arial Unicode MS Regular"],
          "text-size": 12
        },
        'paint': {
          'text-color': '#000000'
        },
        'filter': ['==', '$type', 'Point'],
      });*/
    

});