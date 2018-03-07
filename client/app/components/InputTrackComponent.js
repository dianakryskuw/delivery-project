import React from 'react';
import axios from 'axios';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
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
                pr.inputSent(response.data.departure_point,response.data.arrival_point)
              });
        }	
    render(){	
        return(
            <div>
    <div class="track-input">
        <div class="group">      
            <input type="text" id="inpt" name="order" required />
            <span class="highlight"></span>
            <span class="bar"></span>
            <label>Track Code</label>
        </div>
    </div>
	<div class="button-container">
        <input id="submit-btn" type="submit" onClick={this.getData} value="Track"/>
    </div> 
    </div>)
    }
}
