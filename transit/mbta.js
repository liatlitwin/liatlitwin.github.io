
var myLat = 42.4;
var myLng = -71.11;
var request = new XMLHttpRequest();
var me = new google.maps.LatLng(myLat, myLng);
var myOptions = {
		zoom: 13, // The larger the zoom number, the bigger the zoom
		center: me,
		mapTypeId: google.maps.MapTypeId.ROADMAP
};
var map;
var marker;
var infowindow = new google.maps.InfoWindow();
var xhr;


	/*function readCSVFile(file)
	{
		var rawFile = new XMLHttpRequest();
		rawFile.open("GET", file, true);
		rawFile.onreadystatechange = function ()
		{
		    if(rawFile.readyState === 4)
		    {
		        if(rawFile.status === 200 || rawFile.status == 0)
		        {
		            var allText = rawFile.responseText;
		            alert(allText);
		        }
		    }
		}
		rawFile.send(null);
	}*/
			
	function init()
	{
		map = new google.maps.Map(document.getElementById("map"), myOptions);
		getMyLocation();
		xhr = new XMLHttpRequest();
		xhr.open("get", "http://mbtamap.herokuapp.com/mapper/rodeo.json", true);
		xhr.onreadystatechange = dataReady;
		xhr.send(null);
		//readCSVFile("http://tuftsdev.github.io/WebProgramming/assignments/stations.csv");
		
	}
	function dataReady(){
		if(xhr.readyState == 4 && xhr.status == 200){
			//successful
			scheduleData = JSON.parse(xhr.responseText);
			scheduleDom = document.getElementById("schedule");
		}
		else if(xhr.readyState == 4 && xhr.status == 500){
			//error
		}
	}
	
	function getMyLocation()
	{
		if (navigator.geolocation) { // the navigator.geolocation object is supported on your browser
			navigator.geolocation.getCurrentPosition(function(position) {
				myLat = position.coords.latitude;
				myLng = position.coords.longitude;
				renderMap();
				
			});
		}
		else {
			alert("Geolocation is not supported by your web browser.  What a shame!");
		}
	}

	function renderMap()
	{
		me = new google.maps.LatLng(myLat, myLng);
		
		// Update map and go there...
		map.panTo(me);

		// Create a marker
		marker = new google.maps.Marker({
			position: me,
			title: "Here I Am!"
		});
		marker.setMap(map);
			
		// Open info window on click of marker
		google.maps.event.addListener(marker, 'click', function() {
			infowindow.setContent(marker.title);
			infowindow.open(map, marker);
		});
		console.log("called renderMap");
	}

	function createMarker(place)
	{
		var placeLoc = place.geometry.location;
		var marker = new google.maps.Marker({
			map: map,
			position: place.geometry.location
		});

		google.maps.event.addListener(marker, 'click', function() {
			infowindow.close();
			infowindow.setContent(place.name);
			infowindow.open(map, this);
		});
}
				