  
var grayscale = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  tileSize: 512,
  maxZoom: 18,
  id: "light-v10",
  accessToken: API_KEY
  });

var outdoors = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "outdoors-v11",
  accessToken: API_KEY
  });

var satellite = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/satellite-v9",
  accessToken: API_KEY
  });

// Create a map object
var myMap = L.map("map", {
  center: [15.5994, -28.6731],
  zoom: 3,
  layers: [grayscale, outdoors, satellite]
});  

satellite.addTo(myMap)

var earthquakes = new L.LayerGroup();

 // Define a baseMaps object to hold our base layers
 var baseMaps = {
  "Satellite": satellite,
  "Grayscale": grayscale,
  "Outdoors": outdoors
};

//Create overlay object to hold our overlay layer
var overlayMaps = {
  Earthquake: earthquakes
};

//Add the layer control to the map
L.control.layers(baseMaps, overlayMaps).addTo(myMap);

  
// get data
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

d3.json(url, function(response){
    console.log(response)
    function styleInfo(feature) {
      return {
        radius: getRadius(feature.properties.mag),
        fillColor: getColor(feature.geometry.coordinates[2]),
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
     };
   }
    function getColor(depth) {
      switch (true) {
      case depth > 90: return "red";
      case depth > 70: return "tomato";
      case depth > 50: return "orange";
      case depth > 30: return "yellow";
      case depth > 10: return "yellowgreen";
      default: return "green";
      }
    }

    function getRadius(magnitude) {
      if (magnitude === 0) {
        return 1;
      }
      return magnitude * 4;
    }
    
    L.geoJson(response, {
      pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng);
      },
      style: styleInfo,
      onEachFeature: function(feature, layer) {
         layer.bindPopup(
          "Magnitude:"
           + feature.properties.mag 
           + "<br>Depth:"
           + feature.geometry.coordinates
           + "<br>Location:"
           + feature.properties.place
           );
      }
    }).addTo(earthquakes);

    earthquakes.addTo(myMap);

    var legend = L.control({position: "bottomright"});

    legend.onAdd = function() {
      var div = L.DomUtil.create("div","info legend");
      var grades = [-10, 10, 30, 50, 70, 90];
      var colors = ["green","yellowgreen", "yellow", "orange", "tomato", "red"];

      for (var i = 0; i < grades.length; i++) {
        div.innerHTML += "<i style='background: "
          + colors[i]
          + "'></i> "
          + grades[i]
          + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
      }
      return div;
    };

    legend.addTo(myMap)
  });
