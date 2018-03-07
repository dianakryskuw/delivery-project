import React from 'react';
import axios from 'axios';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DirectionComponent from './DirectionComponent';
import InputTrackComponent from './InputTrackComponent';

export default class TrackingComponent extends React.Component{
    constructor(props){
        super(props);
        this.inputSent=this.inputSent.bind(this);
      }
      state={
          from:{},
          to:{}
      } 
      inputSent (point1, point2){
        this.setState({from: point1})
        this.setState({to: point2})
    }
    render(){	
        return(
        <div>
            <InputTrackComponent inputSent={this.inputSent}/>
        <div className="track-map-container">
            <DirectionComponent origin={this.state.from} destination={this.state.to}/>
        </div>
    </div>)
    }
}
