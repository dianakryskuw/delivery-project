import React from 'react';
import axios from 'axios';
import DirectionComponent from './DirectionComponent';

export default class InputTrackComponent extends React.Component{
    constructor(props){
        super(props);
        this.getData=this.getData.bind(this);
      }
    state={
        data:[]
    }
    getData(){
        var pr=this.props;
        axios.get('/trackorder', {params: {
                order: document.getElementById("inpt").value
              }}).then(function (response) {
                  if (response.data.departure_point)
                    pr.inputSent(response.data.departure_point,response.data.arrival_point, response.data.arrivalDate);
                else
                    alert("Please, input valid track code");
              });
        }	
    render(){	
        return(
            <div className="track-inpt">
            <div class=" read-only">    
      <h1 className="read-only-inpt">Track your order</h1>
    </div>
        <div class="group">      
            <input type="text" id="inpt" name="order" required />
            <span class="highlight"></span>
            <span class="bar"></span>
            <label>Track Code</label>
        </div>
	<div class="button-container">
        <input id="submit-btn" type="submit" onClick={this.getData} value="Track"/>
    </div> 
    </div>)
    }
}
