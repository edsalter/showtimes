var geocoder;
var latitude;
var longitude;

function codeLatLng(position) {
geocoder = new google.maps.Geocoder();
	latitude = parseFloat(position.coords.latitude);
	longitude = parseFloat(position.coords.longitude);  

	jQuery("#latlng").val(latitude + "," + longitude);
}

//display error passed back from browser geoloc
function handle_error(e){
	console.log(e);
	console.log("could not use location");
}



jQuery(document).ready(function () {
	//try and get our geocode
	if (google.loader.ClientLocation) {
		latitude = parseFloat(google.loader.ClientLocation.latitude);
		longitude = parseFloat(google.loader.ClientLocation.longitude);
	}

	//we hopefully already have IP based location, but let's try and improve with proper geo location from user agent
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
			codeLatLng, 
			handle_error
		);
	}
	else {
		handle_error("Geolocation is not supported by this browser");
	}

	//final check to make sure we have values, else print error message
	if(latitude && longitude){
		jQuery("#latlng").val(latitude + "," + longitude);
	}
	else{
		jQuery("#latlng").val("unable to get your location");
	}

});

