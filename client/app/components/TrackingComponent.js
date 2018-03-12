import React from 'react';
import axios from 'axios';
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
      inputSent (point1, point2,date){
        this.setState({
            from: point1,
            to: point2,
            arrive: date
        })
    }
    render(){	
        return(
        <div>
        <div className="input-trackdata-container">
            <InputTrackComponent inputSent={this.inputSent}/>
        </div> 
        <h1 style={{
            display: this.state.arrive ? 'block' : 'none'
        }}
        >{"Your order arrives "+this.state.arrive||""}</h1>
        <div className="track-map-container">
            <DirectionComponent origin={this.state.from} destination={this.state.to}/>
        </div>
    </div>)
    }
}
