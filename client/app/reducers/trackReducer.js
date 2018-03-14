import * as types from '../constants/actionTypes';
import axios from 'axios';

const initialState = {
};

export default function trackOrder(state={}, action) {
        if(action.type==='TRACK'){
         return action.payload;
    }
    else{
    return state;
    } 
  }