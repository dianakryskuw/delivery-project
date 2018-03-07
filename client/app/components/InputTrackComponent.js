import React from 'react';
import axios from 'axios';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DirectionComponent from './DirectionComponent';

export default class InputTrackComponent extends React.Component{
    constructor(props){
        super(props);
      }
    state={
        data:[]
    }
    componentWillMount(){
		axios.get('/trackorder', {params: {
            order: "5a91ef13e4765646a46c7992"
          }}).then(response => this.setState({data: response.data }));
    }	
    render(){	
        console.log(this.state.data);
        return(
    <form action="/trackorder" method="get"> 
    <div class="track-input">
        <div class="group">      
            <input type="text" name="order" required />
            <span class="highlight"></span>
            <span class="bar"></span>
            <label>Track Code</label>
        </div>
    </div>
	<div class="button-container">
        <input id="submit-btn" type="submit" value="Track"/>
    </div>
        </form> )
    }
}
