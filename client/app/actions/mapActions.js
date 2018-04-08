import * as types from '../constants/actionTypes';

export function addMarker(result){
  return {
    type: types.ADD_MARKER,
    payload: result
  }
}

export function addMap(result){
  return {
    type: types.ADD_MAP,
    payload: result
  }
}

export function addRoute(result) {
  if(result)
  return {
    type: types.ADD_ROUTE,
    payload: result
  }
  else
  return {
    type: types.CLEAR_ROUTE,
    payload: {}
  }
}

export function addFromAddress(result) {
  return {
    type: types.ADD_FROM_MARKER,
    payload: result
  }
}

export function addToAddress(result) {
  return {
    type: types.ADD_TO_MARKER,
    payload: result
  }
}