import * as types from '../constants/actionTypes';

const initialState = {};

export default function setMapData(state = initialState, action) {
    switch (action.type) {

        case types.ADD:
            return action.payload;
        default:
            return state;
    }
}