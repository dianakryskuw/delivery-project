import * as types from '../constants/actionTypes';
import axios from 'axios';

const initialState = {
    departure_point:{},
    arrival_point:{},
    direction:{}
};

export default function trackOrder(state = {}, action) { 
    switch (action.type) {

    case types.TRACK:
        return action.payload;
    case types.ADDTRACKROUTE:
        return {
            ...state,
            direction: action.payload
        }
    default:
        return state;
    }
}