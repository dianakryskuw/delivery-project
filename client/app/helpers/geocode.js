
export default function geocode(latLngObj){
    var geocoder = new google.maps.Geocoder();

    return new Promise((resolve, reject) => {
        var addressData={};
        geocoder.geocode({
        'latLng': latLngObj.latLng
        }, (results, status) => {
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