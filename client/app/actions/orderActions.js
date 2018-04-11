import * as types from '../constants/actionTypes';

export function addNewOrder(result) {
    return{
        type: types.ADD_NEW_ORDER,
        payload: result
    }
}