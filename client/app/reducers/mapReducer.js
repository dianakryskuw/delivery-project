import * as types from '../constants/actionTypes';

const initialState = {
};

export default function setMapData(state=initialState, action) {
    switch (action.type) {
        case types.addDirectionData: {
        var data=action.dirData.routes[0].legs[0];
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
                direction: action.dirData
            }
    }
    case types.addAddressData:{
        var data=action.addData;
        return { 
                to: {
                    lat:data&&data.lat,
                    lng:data&&data.lng,
                    address:data&&data.address,
                 }
            }
        }
    case 'RESET':{
        return action.payload;
    }
    default:
    return state;
    } 
  }