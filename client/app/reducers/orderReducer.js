import * as types from '../constants/actionTypes';

const initialState = {};

export default function setMapData(state = initialState, action) {
    switch (action.type) {

        case types.ADD_NEW_ORDER:
            return action.payload;
            
        default:
            return state;
    }
}