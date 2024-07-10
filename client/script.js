import { createLayers } from '../src/layers.js';
import { S421ToGeoJSON } from '../src/converter.js';
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
    container: 'map', 
    style: style, 
    center: [20, 57.5],
    zoom: 5
})

let geojson;

try {
    const response = await fetch('http://localhost:3000')
    const data = await response.text();
    if (data == null) {
        throw new Error('No data');
    }
    geojson = S421ToGeoJSON(data);
    document.querySelector('#info').textContent = '';
} catch (e) {
    document.querySelector('#info').textContent = 'No source file found online. Upload a file to display a route.';
}


map.on('load', async () => {
    const image = await map.loadImage('assets/1x/RTEWPT01.png');
    const image2 = await map.loadImage('assets/1x/RTEACTPOT01.png');


    map.addImage('wpt-img', image.data);
    map.addImage('act-img', image2.data);


    const form = document.querySelector('form');
    const fileInput = document.querySelector('input[type="file"]');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const reader = new FileReader();
        const file = fileInput.files[0];
       if(!file){
            document.querySelector('#info').textContent = 'No file selected';
            return;
       }
        reader.readAsText(file, "UTF-8");
        reader.onload = async (e) => {
            const text = e.target.result;

            geojson = S421ToGeoJSON(text);
            if (geojson) {
                document.querySelector('#info').textContent = '';
                if (map.getSource('geojsonSource')) {
                    map.getSource('geojsonSource').setData(geojson);
                } else {
                    map.addSource('geojsonSource', {
                        'type': 'geojson',
                        'data': geojson
                    });
                    const layers = createLayers('geojsonSource');
                    for (let layer of layers) {
                        map.addLayer(layer);
                    }
                }

            }

        };
    });


    if (geojson) {
        map.addSource('geojsonSource', {
            'type': 'geojson',
            'data': geojson
        });

        const layers = createLayers('geojsonSource');
        for (let layer of layers) {
            map.addLayer(layer);
        }
    }
});