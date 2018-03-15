
export default function getGeoLocation(e){
    var addressData={};
    var geocoder = new google.maps.Geocoder();

    return new Promise(function(resolve, reject) {
        geocoder.geocode({
        'latLng': e.latLng
        }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                console.log('///////////////////////');
                if (results[0]) {
                    console.log('*************************************');
                    addressData={
                    lat:e.latLng.lat(),
                    lng:e.latLng.lng(),
                    address:results[0].formatted_address
                    }
                    resolve(addressData);
                }
            }
        });
    });
}