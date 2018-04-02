import axios from 'axios';
import buildDirection from '../helpers/directionBuilder';

export function assyncGet(currentData){
    return dispatch =>{
  axios.get('/track/'+currentData).then(function (response) {
      if (response.data.departure_point){
          dispatch({ type: 'TRACK', payload: { 
                  departure_point: response.data.departure_point,
                  arrival_point: response.data.arrival_point,
                  arrivalDate: response.data.arrivalDate
              } 
          })
      }
      else
          alert("Please, input valid track code");
    });
    }
}  

export function addTrackRoute(positionFrom, positionTo) {

    return dispatch => {
        buildDirection(positionFrom, positionTo)
            .then(
                result => dispatch({
                    type: 'ADDTRACKROUTE',
                    payload: result
                }),
                error => {
                    console.log(error.message);
                }
            );
    }
}