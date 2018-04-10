export default function buildDirection(markerFrom, markerTo){
    const DirectionsService = new google.maps.DirectionsService();

    return new Promise((resolve, reject) => {
        DirectionsService.route({
        origin: new google.maps.LatLng(markerFrom.lat, markerFrom.lng),
        destination: new google.maps.LatLng(markerTo.lat, markerTo.lng),
        travelMode: google.maps.TravelMode.DRIVING,
        }, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) { 
                resolve(result);
            } 
            if (status === google.maps.DirectionsStatus.ZERO_RESULTS) { 
                let error = new Error("Incorrect data for route")
                reject(error);
            }
        });
    });
}