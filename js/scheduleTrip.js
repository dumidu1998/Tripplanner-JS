
if (typeof (Storage) !== "undefined") {
	//check for logged in user
	if (localStorage.getItem('loggedin') === '1') {
		document.getElementById('name').innerHTML = localStorage.getItem('loggedinname');
	} else {
		//alert to login
		alert("please Login to Continue!!");
		window.location.href = "index.html";
	}
} else {
	//alert that localstorage not supported
	alert("Sorry, your browser does not support web storage...");
	window.location.href = "index.html";

}
//set date
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();
if (dd < 10) {
	dd = '0' + dd
}
if (mm < 10) {
	mm = '0' + mm
}
today = yyyy + '-' + mm + '-' + dd;
document.getElementById("select-date").setAttribute("min", today); //Set min date as today

function selectCountry() { //function to add new options to countries dropdown from array imported
	var select = document.getElementById('country');
	for (var i = 0; i < countryData.length; i++) {
		select.add(new Option(countryData[i]));
	}
}

function getairports() { // get the selected country and call for api for available airports
	var country = document.getElementById('country');
	country = country.options[country.selectedIndex].text;
	startCountry = country;
	webServiceRequest('https://eng1003.monash/OpenFlights/airports/', { country: country, callback: "getallairporsts" });
}

function getallairporsts(data) { // add options for airports to the dropdown from the results of API call
	airportdata = data;
	var airports = document.getElementById('departure-airports');
	removeOptions(airports);
	emptymarkerarray();
	for (var i = 0; i < data.length; i++) {
		airports.add(new Option(data[i].name, data[i].airportId));
		pushtomarkerarray(data[i].name, data[i].longitude, data[i].latitude);
	}
}

function emptymarkerarray() { // remove all the markers when selecting a new country
	markerArray.forEach((marker) => { marker.remove(); });
	markerArray = [];
}

function pushtomarkerarray(name, lng, lat) { // add markers to the map
	const marker = new mapboxgl.Marker()
		.setLngLat([lng, lat])
		.setPopup(new mapboxgl.Popup().setHTML(name))
		.addTo(map);
	markerArray.push(marker);
	map.flyTo({
		center: [lng, lat],
		zoom: 1,
	})

}

function getroutes(airport) { //api call to get routes from an airport
	sourceairportid = airport;
	emptymarkerarray();
	webServiceRequest('https://eng1003.monash/OpenFlights/routes/', { sourceAirport: airport, callback: "showroutes" });

}

function showroutes(routes) { // generate geojson from the results of API
	// map.removeLayer('routes');
	alert("There are " + routes.length + " routes.");
	var all = [];
	for (var i = 0; i < routes.length; i++) {
		//
		all.push({
			'type': 'Feature',
			'properties': { 'dest': routes[i].destinationAirportId },
			'geometry': {
				'type': 'LineString',
				'coordinates': [
					getlonglat(sourceairportid), getlonglat(routes[i].destinationAirportId)
				]
			}
		})
	}
	drawroute(all);

	map.flyTo({  //zoom  and focus to source airport
		center: getlonglat(sourceairportid),
		zoom: 6,
	})

}

function drawroute(routes) { //draw the routes  from the geojson generated above
	map.addSource('routes', { //set source
		'type': 'geojson',
		'data': {
			'type': 'FeatureCollection',
			'features': routes
		}
	});
	map.addLayer({ //show the layer
		'id': 'routes',
		'type': 'line',
		'source': 'routes',
		'layout': {
			'line-join': 'round',
			'line-cap': 'round',
		},
		'paint': {
			'line-color': '#f00',
			'line-width': 4,
			'line-opacity': 0.4
		}
	});

	//event to select the route
	map.on('click', 'routes', function (e) {
		console.log(e.features[0].properties.dest);
		endairportid = e.features[0].properties.dest;
		document.getElementById('dest-show').innerHTML = 'Destination is ' + getaname(e.features[0].properties.dest);
	});
	// Change the cursor to a pointer when the it enters a feature in the 'routes' layer.
	map.on('mouseenter', 'routes', function () {
		map.getCanvas().style.cursor = 'pointer';
	});

	// Change it back to a pointer when it leaves.
	map.on('mouseleave', 'routes', function () {
		map.getCanvas().style.cursor = '';
	});


}

function removeOptions(selectElement) { // remove options of the dropdown
	var i, L = selectElement.options.length - 1;
	for (i = L; i >= 0; i--) {
		selectElement.remove(i);
	}
}

function sendata() { // send data to localstorage when pressing schedule button
	var date = document.getElementById('select-date').value;
	var time = document.getElementById('time').value;
	var start = getaname(sourceairportid);
	var end = getaname(endairportid);
	var startid = sourceairportid;
	var endid = endairportid;
	if (date === "" || time === "" || start === "" || end === "") {
		alert("Please Fill all the details and select a route");
		return false;
	}
	localStorage.setItem("temp_data", JSON.stringify({ 'date': date, 'time': time, 'start': start, 'startCountry': startCountry, 'end': end, 'startid': startid, 'endid': endid }));
	window.location.href = "View Trip Details.html";

}


function getlonglat(id) { //get longitude and latitude from the airport ID
	for (var i = 0; i < airportdata.length; i++) {
		if (airportdata[i].airportId == id) return ([airportdata[i].longitude, airportdata[i].latitude]);
	}
}

function getaname(id) { //get airport name from the airport ID
	for (var i = 0; i < airportdata.length; i++) {
		if (airportdata[i].airportId == id) return (airportdata[i].name);
	}
}


function cancelbtn() { // cancel button function to redirect to home
	window.location.href = "index.html";
}

mapboxgl.accessToken = 'pk.eyJ1IjoidGVhbS0wNyIsImEiOiJja253bTV4NG8wMHZxMnZyeHBxZ3ByNG16In0.qAQw-KiHao4hkEsGqjAqKQ';

let markerArray = [];
let center = [145.1362585, -37.9128781];
let airportdata;
let sourceairportid = "";
let endairportid = "";
let startCountry = "";

let map = new mapboxgl.Map({ // load the map to the interface
	container: 'map',
	style: 'mapbox://styles/mapbox/streets-v10',
	zoom: 1,
	center: center
});
