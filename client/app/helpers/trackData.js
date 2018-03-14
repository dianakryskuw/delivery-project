import axios from 'axios';

export function getData(data){
    axios.get('/trackorder', {params: {
            order: document.getElementById("inpt").value
          }}).then(function (response) {
              if (response.data.departure_point)
                data.inputSent(response.data.departure_point,response.data.arrival_point, response.data.arrivalDate);
            else
                alert("Please, input valid track code");
          });
    }	