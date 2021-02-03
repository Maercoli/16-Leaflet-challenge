// Create a map object
var myMap = L.map("map", {
    center: [15.5994, -28.6731],
    zoom: 3
  });
  
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/satellite-v9",
    accessToken: API_KEY
  }).addTo(myMap);
  
  // get data
  
  var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
  
  d3.json(url, function(response){
    console.log(response)

    var geojsonMarkerOptions = {
      radius: 8,
      fillColor: "#ff7800",
      color: "#000",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
    };

    L.geoJson(response, {
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng)
      },
      //replace geojsonMarkerOptions with a funciton that colors based on depth (use switch and case statement)
      style: geojsonMarkerOptions
      //add popups for each circle
      // ,OnEachFeature: function(feature, layer) {
      //   layer.bindPopup(

      //   )
      // }

    }).addTo(myMap)
  });
  //   //console.log(response.features[0].geometry.coordinates[1])
    
  //   var location = []
  //   var depth = []
  //   var mag = []
    
  //   for (var i = 0; i < response.features.length; i++) {
  //     var tempArray = [] 
  //     tempArray.push(response.features[i].geometry.coordinates[1])
  //     tempArray.push(response.features[i].geometry.coordinates[0])
  //     location.push(tempArray)
  //     depth.push(response.features[i].geometry.coordinates[2])
  //     mag.push(response.features[i].properties.mag)
  //   }
  //   // console.log(Lat)
  //   // console.log(Lon)
  //   // console.log(Depth)
  //   // console.log(Mag)
  
  //   var earthquakeCases = [
  //     {
  //       "location": location,
  //       "depth": depth,
  //       "magnitude": mag
  //     }
  //   ];
  //   // console.log(earthquakeCases[0].location)
  //   // console.log(earthquakeCases[0].magnitude)
  
  //     // Loop through the cities array and create one marker for each city object
  //   for (var i = 0; i < earthquakeCases.length; i++) {
  
  //     // Conditionals for earthquake size/mag 
  //     var color = "";
  //     if (earthquakeCases[i].magnitude > 4) {
  //       color = "yellow";
  //     }
  //     else if (earthquakeCases[i].magnitude > 3) {
  //       color = "blue";
  //     }
  //     else if (earthquakeCases[i].magnitude > 2) {
  //       color = "green";
  //     }
  //     else {
  //       color = "red";
  //     }
  
  //     // Add circles to map
  //     L.circle(earthquakeCases[i].location, {
  //       fillOpacity: 0.75,
  //       color: "white",
  //       fillColor: color,
  //       // Adjust radius
  //       radius: earthquakeCases[i].magnitude * 1500
  //     }).bindPopup(" <h3>Points: " + earthquakeCases[i].magnitude + "</h3>").addTo(myMap);
  // }
  
  // });