export default function buildDirection(marker1, marker2){
    const DirectionsService = new google.maps.DirectionsService();

    return new Promise(function(resolve, reject) {
        DirectionsService.route({
        origin: new google.maps.LatLng(marker1.lat(), marker1.lng()),
        destination: new google.maps.LatLng(marker2.lat(), marker2.lng()),
        travelMode: google.maps.TravelMode.DRIVING,
        }, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) { 
                resolve(result);
            } 
            else {
                reject(new Error("Can''t create route, please check your map data"));
            }
        });
    });
}