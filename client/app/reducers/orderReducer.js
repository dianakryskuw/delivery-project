import * as types from '../constants/actionTypes';

const initialState = {
    departurePoint:{},
    arrivalPoint:{},
    distance:{},
    time:{},
    direction:{}
};

export default function setOrderData(state = initialState, action) {
    switch (action.type) {
        case types.ADD_NEW_ORDER:{
            return action.payload;
        }
            
        default:
            return state;
    }
}