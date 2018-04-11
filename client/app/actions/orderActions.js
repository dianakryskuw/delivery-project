import * as types from '../constants/actionTypes';

export function addNewOrder(result) {
    console.log(result);
    return{
        type: types.ADD_NEW_ORDER,
        payload: result
    }
}