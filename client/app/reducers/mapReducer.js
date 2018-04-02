import * as types from '../constants/actionTypes';

const initialState = {
    departure_point:{},
    arrival_point:{},
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
                departure_point: state.arrival_point,
                arrival_point:data
            }
        }
        case types.ADDFROMMARKER:{
            var data = action.payload;
            return {
                ...state,
                departure_point:data
            }
        }
        case types.ADDTOMARKER:{
            var data = action.payload;
            return {
                ...state,
                arrival_point:data
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