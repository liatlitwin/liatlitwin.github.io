var myLat =0;
var myLng =0;
var map;

function init(){
	map = new google.maps.Map(document.getElementById("map"));
	getMyLocation();
}

function getMyLocation(){
	if (navigator.geolocation) { 
		navigator.geolocation.getCurrentPosition(function(position) {
			myLat = position.coords.latitude;
			myLng = position.coords.longitude;
			renderMap();
		});
	}
	else {
		alert("Geolocation is not supported by your web browser.");
	}
}