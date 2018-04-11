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
            console.log(action.payload);
            return action.payload;
        }
            
        default:
            return state;
    }
}