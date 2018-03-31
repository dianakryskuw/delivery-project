var GoogleMapsAPI = require('googlemaps');
var publicConfig = {
    key: 'AIzaSyAoT2e9ISl-I6CU8tBpxzo0MFAEpka8Wc4',
    stagger_time:       1000, // for elevationPath 
    encode_polylines:   false,
    secure:             true, // use https 
  };
  var gmAPI = new GoogleMapsAPI(publicConfig);
   
  var geocode = (reverseGeocodeParams) => new Promise(function(resolve, reject) {
      gmAPI.reverseGeocode(reverseGeocodeParams, function(err, result){
    console.log("RESULT: ",result.results[0]);
    resolve(result.results[0]);
  });
});
  module.exports={geocode}