import * as types from '../constants/actionTypes';

export function addMarker(result){
  return {
    type: types.ADD_MARKER,
    payload: result
  }
}

export function addRoute(result) {
  return {
    type: types.ADD_ROUTE,
    payload: result
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
    type: types.ADD_MARKER,
    payload: result
  }
}