
export default function getGeoLocation(latLngObj){
    var geocoder = new google.maps.Geocoder();

    return new Promise(function(resolve, reject) {
        var addressData={};
        geocoder.geocode({
        'latLng': latLngObj.latLng
        }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    addressData={
                    lat:latLngObj.latLng.lat(),
                    lng:latLngObj.latLng.lng(),
                    address:results[0].formatted_address
                    }
                    resolve(addressData);
                }
            }
        });
    });
}