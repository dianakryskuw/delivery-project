import axios from 'axios';
export function addNewOrder(currentData) {
    return dispatch => {
        axios.post('/addorder', {
            currentData
        }).then(function(response) {
            if (response.data) {
                console.log('RESPONSE',response.data)
                dispatch({
                    type: 'ADD',
                    payload: response.data
                })
            } 
            else{
                dispatch({
                    type: 'ADD',
                    payload: {}
                })
            }
        });
    }
}