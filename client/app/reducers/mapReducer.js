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

        case types.ADD_MARKER:{
            var data = action.payload;
            return {
                ...state,
                departurePoint: state.arrivalPoint,
                arrivalPoint:data
            }
        }

        case types.ADD_MAP:{
            var data = action.payload;
            return {
                ...state,
                map:data
            }
        }

        case types.ADD_FROM_MARKER:{
            var data = action.payload;
            return {
                ...state,
                departurePoint:data
            }
        }

        case types.ADD_TO_MARKER:{
            var data = action.payload;
            return {
                ...state,
                arrivalPoint:data
            }
        }

        case types.ADD_ROUTE:{
            var data = action.payload.routes[0].legs[0];
            return {
                ...state,
                distance: data.distance,
                time: data.duration,
                direction: action.payload
            }
        }

        case types.CLEAR_ROUTE:{
            return {
                ...state,
                distance: null,
                time: null,
                direction: null
            }
        }

        case types.RESET_MAP:{
            return initialState;
        }

        default:
            return state;
    }
}