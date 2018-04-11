import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import geocode from './helpers/geocode';
import buildDirection from './helpers/directionBuilder';
import * as mapActions from './actions/mapActions'
import * as trackActions from './actions/trackActions'
import * as orderActions from './actions/orderActions'
import axios from 'axios';

export function addMarker(objLatLng) {
    return dispatch => {
        geocode(objLatLng).then(result => {
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
        axios.get('/tracking/' + currentData).then(response => {
            if (response.data.success) {
                return dispatch(trackActions.trackByCode(response.data.order));
            } 
            else{
                alert("Please, input a valid track code");
                return dispatch(trackActions.trackByCode({}));
            }
        });
    }
}

export function addNewOrder(currentData) {
    return dispatch => {
        axios.post('/addorder', {
            currentData
        }).then(function(response) {
            if (response.data.success) {
                return dispatch(orderActions.addNewOrder(response.data.order));
            }
            else{
                alert("Sorry, your order data is not valid");
            }
        });
    }
}

export function resetAdding() {
    return dispatch => dispatch(mapActions.resetMapInfo());
}

export function resetTracking() {
    return dispatch => dispatch(trackActions.trackByCode({}));
}