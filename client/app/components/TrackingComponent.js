import React from 'react';
import axios from 'axios';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DirectionComponent from './DirectionComponent';
import InputTrackComponent from './InputTrackComponent';

export default class TrackingComponent extends React.Component{
    constructor(props){
        super(props);
      }
 
    render(){	
        return(
        <div>
            <InputTrackComponent />
        <div className="track-map-container">
            <DirectionComponent olat={49.85} olng={24.016} dlat={49.8525800} dlng={24.6514100}/>
        </div>
    </div>)
    }
}
