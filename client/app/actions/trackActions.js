import * as types from '../constants/actionTypes';

export function trackByCode(result){
    return { 
        type: types.TRACK, 
        payload: result
    }
}  
