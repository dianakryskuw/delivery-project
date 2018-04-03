import React from 'react';
import { connect } from 'react-redux';
const {
  Marker,
  DirectionsRenderer
} = require("react-google-maps");
import {addRoute, addMarker} from '../actions/mapActions';

class MapAttachment extends React.Component{
	constructor(props){
    super(props);
    }

    render(){
      var data = this.props.data;
      return(
        <div>
            <Marker label="From" position={data.departure_point} draggable={true} 
            onDragEnd={(e) => this.props.getMarker(e)} 
            onPositionChanged={this.props.getRoute(data.departure_point,data.arrival_point)}
            />
            <Marker label="To" position={data.arrival_point} draggable={true}  
            onDragEnd={(e) => this.props.getMarker(e)} 
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
  dispatch => ({
    getRoute: (pos1, pos2) => {
      dispatch(addRoute(pos1, pos2))
    },
    getMarker: (m) => {
      dispatch(addMarker(m))
    }
  })
)(MapAttachment);