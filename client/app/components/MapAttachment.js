import React from 'react';
import { connect } from 'react-redux';
const {
  Marker,
  DirectionsRenderer
} = require("react-google-maps");
import {addRoute, addMarker} from '../logic';

class MapAttachment extends React.Component{
	constructor(props){
    super(props);
    }

    render(){
      var data = this.props.data;
      return(
        <div>
            <Marker label="From" position={data.departurePoint} draggable={true} 
            onDragEnd={(e) => this.props.addMarker(e)} 
            onPositionChanged={this.props.addRoute(data.departurePoint,data.arrivalPoint)}
            />
            <Marker label="To" position={data.arrivalPoint} draggable={true}  
            onDragEnd={(e) => this.props.addMarker(e)} 
            />
            <DirectionsRenderer directions={data.direction} />
        </div>
      );
    }
}

export default connect(
  state => ({
      data:state.mapReducer
  }),
 {addMarker,addRoute}
)(MapAttachment);