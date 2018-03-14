import axios from 'axios';
export function assyncGet(currentData){
    return dispatch =>{
  axios.get('/trackorder', {params: {
      order: currentData
    }}).then(function (response) {
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