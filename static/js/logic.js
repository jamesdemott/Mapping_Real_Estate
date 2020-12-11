const API_KEY = "pk.eyJ1IjoiaGV5ZGVtbyIsImEiOiJja2gzczRzYXYwMWE2MnlwNG91Zm42MW4xIn0.6B_vzs1Ji1enb4_R9IJgxQ" ;// We create the tile layer that will be the background of our map.

let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
	center: [47.632612, -122.333832],
	zoom: 12,
	layers: [streets]
});

let baseMaps = {
    "Streets": streets};

// Add Layer Groups
let forSaleHomes = new L.LayerGroup();

//Add Overlays 
let overlays = {"For Sale Homes": forSaleHomes};

L.control.layers(baseMaps, overlays).addTo(map);


//Adding our other data
const http = require("https");

const options = {
	"method": "GET",
	"hostname": "realtor.p.rapidapi.com",
	"port": null,
	"path": "/properties/v2/list-for-sale?city=Seattle&limit=200&offset=0&state_code=WA&sort=relevance",
	"headers": {
		"x-rapidapi-key": "3ec348e095msh58191911b39b7adp1b543ejsna82e34a99b62",
		"x-rapidapi-host": "realtor.p.rapidapi.com",
		"useQueryString": true
	}
};

const req = http.request(options, function (res) {
	const chunks = [];

	res.on("data", function (chunk) {
		chunks.push(chunk);
	});

	res.on("end", function () {
		const body = Buffer.concat(chunks);
		console.log(body.toString());
	});
});

req.end();