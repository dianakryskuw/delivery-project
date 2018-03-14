import axios from 'axios';
export function addNewOrder(currentData){
    return dispatch =>{
  axios.post('/addorder', {
            currentData
        }
    ).then(function (response) {
      if (response.data){
          dispatch({ type: 'ADD', payload: response.data
          })
      }
      else
          alert("Error");
    });
    }
}  