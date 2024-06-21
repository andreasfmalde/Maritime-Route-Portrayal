
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

const geoJSON = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "name":"RTE.WPT.2",
        "properties": {
            "routeWaypointID":"4",
            "routeWaypointName":"Stavanger",
            "routeWaypointFixed":"false",
            "routeWaypointTurnRadius":0.0
        },
        "geometry": {
          "type": "Point",
          "coordinates": [5.72598921, 58.97756611]
        }
      },
      {
        "type": "Feature",
        "name":"RTE.WPT.LEG.2",
        "properties": {
            "routeWaypointID":"4",
            "routeWaypointName":"Stavanger",
            "routeWaypointFixed":"false",
            "routeWaypointTurnRadius":0.0
        },
        "geometry": {
          "type": "LineString",
          "coordinates": [[5.72598921, 58.97756611],[5.71134896, 58.98633212]]
        }
      },
      {
        "type": "Feature",
        "name":"RTE.WPT.3",
        "properties": {
            "routeWaypointID":"18",
            "routeWaypointName":"Ulsnesgrunnen",
            "routeWaypointExternalReferenceID":"",
            "routeWaypointFixed":"false",
            "routeWaypointTurnRadius":1.0
        },
        "geometry": {
          "type": "Point",
          "coordinates": [5.71134896, 58.98633212]
        }
      },
      {
        "type": "Feature",
        "name":"RTE.WPT.LEG.3",
        "properties": {
            "routeWaypointID":"4",
            "routeWaypointName":"Stavanger",
            "routeWaypointFixed":"false",
            "routeWaypointTurnRadius":0.0
        },
        "geometry": {
          "type": "LineString",
          "coordinates": [[5.71134896, 58.98633212],[5.69128408, 59.0034202]]
        }
      },
      {
        "type": "Feature",
        "name":"RTE.WPT.4",
        "properties": {
            "routeWaypointID":"19",
            "routeWaypointName":"Dusaviga",
            "routeWaypointExternalReferenceID":"",
            "routeWaypointFixed":"false",
            "routeWaypointTurnRadius":1.0
        },
        "geometry": {
          "type": "Point",
          "coordinates": [5.69128408, 59.0034202]
        }
      },
      {
        "type": "Feature",
        "name":"RTE.WPT.LEG.4",
        "properties": {
            "routeWaypointID":"4",
            "routeWaypointName":"Stavanger",
            "routeWaypointFixed":"false",
            "routeWaypointTurnRadius":0.0
        },
        "geometry": {
          "type": "LineString",
          "coordinates": [[5.69128408, 59.0034202],[5.62475297, 59.03169439]]
        }
      },
      {
        "type": "Feature",
        "name":"RTE.WPT.5",
        "properties": {
            "routeWaypointID":"18",
            "routeWaypointName":"Merkjarvik",
            "routeWaypointExternalReferenceID":"",
            "routeWaypointFixed":"false",
            "routeWaypointTurnRadius":1.0
        },
        "geometry": {
          "type": "Point",
          "coordinates": [5.62475297, 59.03169439]
        }
      },
      {
        "type": "Feature",
        "name":"RTE.WPT.LEG.5",
        "properties": {
            "routeWaypointID":"4",
            "routeWaypointName":"Stavanger",
            "routeWaypointFixed":"false",
            "routeWaypointTurnRadius":0.0
        },
        "geometry": {
          "type": "LineString",
          "coordinates": [[5.62475297, 59.03169439],[5.57044147, 59.06223487]]
        }
      },
      {
        "type": "Feature",
        "name":"RTE.WPT.6",
        "properties": {
            "routeWaypointID":"18",
            "routeWaypointName":"Bragen",
            "routeWaypointExternalReferenceID":"",
            "routeWaypointFixed":"false",
            "routeWaypointTurnRadius":1.0
        },
        "geometry": {
          "type": "Point",
          "coordinates": [5.57044147, 59.06223487]
        }
      },
      {
        "type": "Feature",
        "name":"RTE.WPT.LEG.6",
        "properties": {
            "routeWaypointID":"4",
            "routeWaypointName":"Stavanger",
            "routeWaypointFixed":"false",
            "routeWaypointTurnRadius":0.0
        },
        "geometry": {
          "type": "LineString",
          "coordinates": [[5.57044147, 59.06223487],[5.53981905, 59.03719746]]
        }
      },
      {
        "type": "Feature",
        "name":"RTE.WPT.7",
        "properties": {
            "routeWaypointID":"18",
            "routeWaypointName":"Bragen",
            "routeWaypointExternalReferenceID":"",
            "routeWaypointFixed":"false",
            "routeWaypointTurnRadius":1.0
        },
        "geometry": {
          "type": "Point",
          "coordinates": [5.53981905, 59.03719746]
        }
      },
      {
        "type": "Feature",
        "name":"RTE.WPT.LEG.7",
        "properties": {
            "routeWaypointID":"4",
            "routeWaypointName":"Stavanger",
            "routeWaypointFixed":"false",
            "routeWaypointTurnRadius":0.0
        },
        "geometry": {
          "type": "LineString",
          "coordinates": [[5.53981905, 59.03719746],[5.53968815, 59.01186667]]
        }
      },
      {
        "type": "Feature",
        "name":"RTE.WPT.8",
        "properties": {
            "routeWaypointID":"21",
            "routeWaypointName":"",
            "routeWaypointExternalReferenceID":"",
            "routeWaypointFixed":"false",
            "routeWaypointTurnRadius":1.0
        },
        "geometry": {
          "type": "Point",
          "coordinates": [5.53968815, 59.01186667]
        }
      },
      {
        "type": "Feature",
        "name":"RTE.WPT.LEG.8",
        "properties": {
            "routeWaypointID":"4",
            "routeWaypointName":"Stavanger",
            "routeWaypointFixed":"false",
            "routeWaypointTurnRadius":0.0
        },
        "geometry": {
          "type": "LineString",
          "coordinates": [[5.53968815, 59.01186667],[5.55214898, 58.97867789]]
        }
      },
      {
        "type": "Feature",
        "name":"RTE.WPT.9",
        "properties": {
            "routeWaypointID":"20",
            "routeWaypointName":"Bjoernaflua",
            "routeWaypointExternalReferenceID":"",
            "routeWaypointFixed":"false",
            "routeWaypointTurnRadius":1.0
        },
        "geometry": {
          "type": "Point",
          "coordinates": [5.55214898, 58.97867789]
        }
      },
      {
        "type": "Feature",
        "name":"RTE.WPT.LEG.9",
        "properties": {
            "routeWaypointID":"4",
            "routeWaypointName":"Stavanger",
            "routeWaypointFixed":"false",
            "routeWaypointTurnRadius":0.0
        },
        "geometry": {
          "type": "LineString",
          "coordinates": [[5.55214898, 58.97867789],[5.54681321, 58.92876049]]
        }
      },
      {
        "type": "Feature",
        "name":"RTE.WPT.10",
        "properties": {
            "routeWaypointID":"17",
            "routeWaypointName":"Midtfjaera",
            "routeWaypointExternalReferenceID":"",
            "routeWaypointFixed":"false",
            "routeWaypointTurnRadius":1.0
        },
        "geometry": {
          "type": "Point",
          "coordinates": [5.54681321, 58.92876049]
        }
      },
      {
        "type": "Feature",
        "name":"RTE.WPT.LEG.10",
        "properties": {
            "routeWaypointID":"4",
            "routeWaypointName":"Stavanger",
            "routeWaypointFixed":"false",
            "routeWaypointTurnRadius":0.0
        },
        "geometry": {
          "type": "LineString",
          "coordinates": [[5.54681321, 58.92876049],[5.50703709, 58.86141213]]
        }
      },
      {
        "type": "Feature",
        "name":"RTE.WPT.11",
        "properties": {
            "routeWaypointID":"10",
            "routeWaypointName":"Soerskot",
            "routeWaypointExternalReferenceID":"",
            "routeWaypointFixed":"false",
            "routeWaypointTurnRadius":1.0
        },
        "geometry": {
          "type": "Point",
          "coordinates": [5.50703709, 58.86141213]
        }
      },
      {
        "type": "Feature",
        "name":"RTE.WPT.LEG.11",
        "properties": {
            "routeWaypointID":"4",
            "routeWaypointName":"Stavanger",
            "routeWaypointFixed":"false",
            "routeWaypointTurnRadius":0.0
        },
        "geometry": {
          "type": "LineString",
          "coordinates": [[5.50703709, 58.86141213],[5.38983562, 58.7985905]]
        }
      },
      {
        "type": "Feature",
        "name":"RTE.WPT.12",
        "properties": {
            "routeWaypointID":"12",
            "routeWaypointName":"Skotemedgrunnen",
            "routeWaypointExternalReferenceID":"",
            "routeWaypointFixed":"false",
            "routeWaypointTurnRadius":1.0
        },
        "geometry": {
          "type": "Point",
          "coordinates": [5.38983562, 58.7985905]
        }
      },
    ]
};


map.on('load', () => {
    map.addSource('geojsonSource', {
        'type': 'geojson',
        'data': geoJSON
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