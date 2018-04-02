import {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete'
import getGeoLocation from '../helpers/geoLocation';
import buildDirection from '../helpers/directionBuilder';

const _ = require("lodash");


export function addMarker(objLatLng) {

  return dispatch => {
          getGeoLocation(objLatLng).then(result => dispatch({
              type: 'ADDMARKER',
              payload: result
          }));
  }
}


export function addRoute(positionFrom, positionTo) {

  return dispatch => {
          buildDirection(positionFrom, positionTo)
              .then(
                  result => dispatch({
                      type: 'ADDROUTE',
                      payload: result
                  }),
                  error => {
                      console.log(error.message);
                  }
              );
  }
}


export function addAddress(address, mytype) {

  return dispatch => {
      geocodeByAddress(address)
          .then(results => getLatLng(results[0]))
          .then(latLng => {
              var payload = {
                  address: address,
                  lat: latLng.lat,
                  lng: latLng.lng
              };
              if (mytype == 'From') {
                  dispatch({
                      type: 'ADDFROMMARKER',
                      payload
                  })
              }
              else if (mytype == 'To') {
                  dispatch({
                      type: 'ADDTOMARKER',
                      payload
                  })
              }
          })
          .catch(error => console.error('Error', error))
  }
}