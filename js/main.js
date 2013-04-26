var geocoder;

function codeLatLng(position) {
  geocoder = new google.maps.Geocoder();

  var lat = parseFloat(position.coords.latitude);
  var lng = parseFloat(position.coords.longitude);
  var latlng = new google.maps.LatLng(lat, lng);

  geocoder.geocode({'latLng': latlng}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      if (results[0]) {
        var currentLocation = results[0];
        
        //var formatted_address = currentLocation.formatted_address;
        var city = _.find(currentLocation.address_components, function(address){
          return address.types[0] == "locality"}
        );

        //jQuery("#latlng").val(city.long_name);
        jQuery("#latlng").val(lat + "," + lng);
      } else {
        alert('No results found');
      }
    } else {
      alert('Geocoder failed due to: ' + status);
    }
  });
}

//display error passed back from browser geoloc
function displayError(e){
    console.log(e);
}

//try and get our geocode
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    codeLatLng, 
    displayError
  );
}
else {
  alert("Geolocation is not supported by this browser");
}