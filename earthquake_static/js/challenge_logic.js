const API_KEY = "pk.eyJ1IjoiaGV5ZGVtbyIsImEiOiJja2gzczRzYXYwMWE2MnlwNG91Zm42MW4xIn0.6B_vzs1Ji1enb4_R9IJgxQ";

// We create the tile layer that will be the background of our map.
var streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 25,
	accessToken: API_KEY
});

// We create the second tile layer that will be the background of our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 25,
	accessToken: API_KEY
});

let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  arrtribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 25,
	accessToken: API_KEY
});

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
	center: [47.632612, -122.333832],
	zoom: 11.5,
	layers: [streets]
});

// Create a base layer that holds all three maps.
let baseMaps = {
  "Streets": streets,
  "Satellite": satelliteStreets, 
  "Dark": dark
};

// 1. Add a 2nd layer group for the tectonic plate data.
let current_for_sale = new L.LayerGroup();
// let allEarthquakes = new L.LayerGroup();
// let tectonicPlates = new L.LayerGroup();
// let majorearthquakes = new L.LayerGroup();


// // 2. Add a reference to the tectonic plates group to the overlays object.
let overlays = {"For Sale Homes": current_for_sale};
//   "Earthquakes": allEarthquakes, 
//   "Tectonic Plates": tectonicPlates, 
//   "Major Earthquakes": majorearthquakes
// };

// // Then we add a control to the map that will allow the user to change which
// // layers are visible.
L.control.layers(baseMaps, overlays).addTo(map);

// // Retrieve the earthquake GeoJSON data.
// d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {

//   // This function returns the style data for each of the earthquakes we plot on
//   // the map. We pass the magnitude of the earthquake into two separate functions
//   // to calculate the color and radius.
//   function styleInfo(feature) {
//     return {
//       opacity: 1,
//       fillOpacity: 1,
//       fillColor: getColor(feature.properties.mag),
//       color: "#000000",
//       radius: getRadius(feature.properties.mag),
//       stroke: true,
//       weight: 0.5
//     };
//   }

//   // This function determines the color of the marker based on the magnitude of the earthquake.
//   function getColor(magnitude) {
//     if (magnitude > 5) {
//       return "#ea2c2c";
//     }
//     if (magnitude > 4) {
//       return "#ea822c";
//     }
//     if (magnitude > 3) {
//       return "#ee9c00";
//     }
//     if (magnitude > 2) {
//       return "#eecc00";
//     }
//     if (magnitude > 1) {
//       return "#d4ee00";
//     }
//     return "#98ee00";
//   }

//   // This function determines the radius of the earthquake marker based on its magnitude.
//   // Earthquakes with a magnitude of 0 were being plotted with the wrong radius.
//   function getRadius(magnitude) {
//     if (magnitude === 0) {
//       return 1;
//     }
//     return magnitude * 4;
//   }

//   // Creating a GeoJSON layer with the retrieved data.
//   L.geoJson(data, {
//     	// We turn each feature into a circleMarker on the map.
//     	pointToLayer: function(feature, latlng) {
//       		console.log(data);
//       		return L.circleMarker(latlng);
//         },
//       // We set the style for each circleMarker using our styleInfo function.
//     style: styleInfo,
//      // We create a popup for each circleMarker to display the magnitude and location of the earthquake
//      //  after the marker has been created and styled.
//      onEachFeature: function(feature, layer) {
//       layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
//     }
//   }).addTo(allEarthquakes);

//   // Then we add the earthquake layer to our map.
//   allEarthquakes.addTo(map);

//   // Here we create a legend control object.
// let legend = L.control({
//   position: "bottomright"
// });

// // Then add all the details for the legend
// legend.onAdd = function() {
//   let div = L.DomUtil.create("div", "info legend");

//   const magnitudes = [0, 1, 2, 3, 4, 5];
//   const colors = [
//     "#98ee00",
//     "#d4ee00",
//     "#eecc00",
//     "#ee9c00",
//     "#ea822c",
//     "#ea2c2c"
//   ];

// // Looping through our intervals to generate a label with a colored square for each interval.
//   for (var i = 0; i < magnitudes.length; i++) {
//     console.log(colors[i]);
//     div.innerHTML +=
//       "<i style='background: " + colors[i] + "'></i> " +
//       magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
//     }
//     return div;
//   };

//   // Finally, we our legend to the map.
//   legend.addTo(map);

//   // 3. Use d3.json to make a call to get our Tectonic Plate geoJSON data.
//   let tectonic_url = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json";
  
//   d3.json(tectonic_url).then(function(data) {
//     console.log(data);
//     //append the geojson data to the tectonic plates layer 

//     L.geoJson(data, {
//       color: "red", 
//       weight: 2, 
//       fillColor: "none", 
//       opacity: .7
//     }
//       ).addTo(tectonicPlates);
//   });
//   //add tectonic plates layer to map 
//   tectonicPlates.addTo(map);
// });


// // 4. Retrieve the major earthquake GeoJSON data >4.5 mag for the week.
// let major_earthquakes_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson"

// d3.json(major_earthquakes_url).then(function(data) {
//   // This function returns the style data for each of the earthquakes we plot on
//   // the map. We pass the magnitude of the earthquake into two separate functions
//   // to calculate the color and radius.
//   function styleInfo(feature) {
//     return {
//       opacity: 1,
//       fillOpacity: 1,
//       fillColor: getColor(feature.properties.mag),
//       color: "#000000",
//       radius: getRadius(feature.properties.mag),
//       stroke: true,
//       weight: 0.5
//     };
//   }

//   // This function determines the color of the marker based on the magnitude of the earthquake.
//   function getColor(magnitude) {
//     if (magnitude < 5) {
//       return "#ea2c2c";
//     }
//     if (magnitude > 5) {
//       return "#ea822c";
//     }
//     if (magnitude > 4) {
//       return "#ee9c00";
//     }
//     return "#98ee00";
//   }

//   // This function determines the radius of the earthquake marker based on its magnitude.
//   // Earthquakes with a magnitude of 0 were being plotted with the wrong radius.
//   function getRadius(magnitude) {
//     if (magnitude === 0) {
//       return 1;
//     }
//     return magnitude * 4;
//   }

//   // Creating a GeoJSON layer with the retrieved data.
//   L.geoJson(data, {
//     	// We turn each feature into a circleMarker on the map.
//     	pointToLayer: function(feature, latlng) {
//       		console.log(data);
//       		return L.circleMarker(latlng);
//         },
//       // We set the style for each circleMarker using our styleInfo function.
//     style: styleInfo,
//      // We create a popup for each circleMarker to display the magnitude and location of the earthquake
//      //  after the marker has been created and styled.
//      onEachFeature: function(feature, layer) {
//       layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
//     }
//   }).addTo(majorearthquakes);

//   // Then we add the earthquake layer to our map.
//   majorearthquakes.addTo(map); 
// });
//   // 5. Change the color function to use three colors for the major earthquakes based on the magnitude of the earthquake.
  
  
//   // 6. Use the function that determines the radius of the earthquake marker based on its magnitude.
  
  
//   // 7. Creating a GeoJSON layer with the retrieved data that adds a circle to the map 
//   // sets the style of the circle, and displays the magnitude and location of the earthquake
//   //  after the marker has been created and styled.
  
//   // 8. Add the major earthquakes layer to the map.
  
//   // 9. Close the braces and parentheses for the major earthquake data.

const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://realtor.p.rapidapi.com/properties/v2/list-for-sale?city=New%20York%20City&limit=200&offset=0&state_code=NY&sort=relevance",
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "3ec348e095msh58191911b39b7adp1b543ejsna82e34a99b62",
		"x-rapidapi-host": "realtor.p.rapidapi.com"
	}
};

$.ajax(settings).done(function (data) {
  console.log(data);
  d3.json(data).then(function(data){
    console.log(data);
    L.geoJson(data, {
      pointToLayer: function(feature, latlng){console.log(data);
      return L.circleMarker(latlng);
    }, 
    onEachFeature: function(feature, layer) {
      layer.bindPopup(feature.properties.address.line);
    }
  }).addTo(for_sale_homes)});
});


