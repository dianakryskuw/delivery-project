import * as types from '../constants/actionTypes';

const initialState = {
    departurePoint:{},
    arrivalPoint:{},
    distance:{},
    time:{},
    direction:{}
};

export default function setMapData(state = initialState, action) {
    switch (action.type) {

        case types.ADDMARKER:{
            var data = action.payload;
            return {
                ...state,
                departurePoint: state.arrivalPoint,
                arrivalPoint:data
            }
        }
        case types.ADDFROMMARKER:{
            var data = action.payload;
            return {
                ...state,
                departurePoint:data
            }
        }
        case types.ADDTOMARKER:{
            var data = action.payload;
            return {
                ...state,
                arrivalPoint:data
            }
        }
        case types.ADDROUTE:{
            var data = action.payload.routes[0].legs[0];
            return {
                ...state,
                distance: data.distance,
                time: data.duration,
                direction: action.payload
            }
        }
        default:
            return state;
    }
}