import {
    geocodeByAddress,
    getLatLng
} from 'react-places-autocomplete'
import getGeoLocation from './helpers/geoLocation';
import buildDirection from './helpers/directionBuilder';
import * as mapActions from './actions/mapActions'
import * as trackActions from './actions/trackActions'
import * as orderActions from './actions/orderActions'
import axios from 'axios';

export function addMarker(objLatLng) {

    return dispatch => {
        getGeoLocation(objLatLng).then(result => {
            return dispatch(mapActions.addMarker(result));
        });
    }
}

export function addMap(map) {

    return dispatch => dispatch(mapActions.addMap(map));
}

export function addRoute(positionFrom, positionTo) {

    return dispatch => {
        buildDirection(positionFrom, positionTo)
            .then(
                result => {
                    return dispatch(mapActions.addRoute(result));
                },
                error =>{
                    return dispatch(mapActions.addRoute(null));
                }
            );
    }
}


export function addAddress(address, mytype) {

    return dispatch => {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(result => {
                result.address = address
                if (mytype == 'From') {
                    return dispatch(mapActions.addFromAddress(result));
                } else if (mytype == 'To') {
                    return dispatch(mapActions.addToAddress(result));
                }
            })
    }
}


export function trackByCode(currentData) {
    return dispatch => {
        axios.get('/track/' + currentData).then(response => {
            if (response.data.departurePoint) {
                return dispatch(trackActions.trackByCode(response.data));
            } else
                alert("Please, input valid track code");
        });
    }
}

export function addNewOrder(currentData) {
    return dispatch => {
        axios.post('/addorder', {
            currentData
        }).then(function(response) {
            if (response.data) {
                return dispatch(orderActions.addNewOrder(response.data));
            }
        });
    }
}