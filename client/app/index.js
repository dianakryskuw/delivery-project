
import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import Routes from './routes';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

function transportData(state={}, action) {
    if (action.type === '1') {
        var data=action.payload.routes[0].legs[0];
        return { 
                from: {
                    lat:data.start_location.lat(),
                    lng:data.start_location.lng(),
                    address:data.start_address,
                 }, 
                 to: {
                    lat:data.end_location.lat(),
                    lng:data.end_location.lng(),
                    address:data.end_address,
                 },
                distance: data.distance, 
                time: data.duration,
                direction: action.payload
            }
    }
    if (action.type === '2') {
        var data=action.payload;
        return { 
                to: {
                    lat:data.lat,
                    lng:data.lng,
                    address:data.address,
                 }
            }
    } 
    return state;
  }
  
const store = createStore(transportData);
ReactDOM.render(
<Provider store={store}>
    <Routes />
</Provider>,
 document.getElementById('root')
);
