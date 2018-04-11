var GoogleMapsAPI = require('googlemaps');
var publicConfig = {
    key: 'AIzaSyAoT2e9ISl-I6CU8tBpxzo0MFAEpka8Wc4',
    stagger_time: 1000, // for elevationPath 
    encode_polylines: false,
    secure: true, // use https 
};
var gmAPI = new GoogleMapsAPI(publicConfig);

var distance = (distanceParams) => new Promise((resolve, reject) => {
    gmAPI.distance(distanceParams, (err, result) => {
        resolve(result);
    });
});
module.exports = distance