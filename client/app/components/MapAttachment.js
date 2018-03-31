import React from 'react';
import { connect } from 'react-redux';
const {
  Marker,
  DirectionsRenderer
} = require("react-google-maps");
import {addRoute} from '../actions/mapActions';

class MapAttachment extends React.Component{
	constructor(props){
    super(props);
    }

    render(){
    var data = this.props.data.mapReducer;
    return(
    <div>
        <Marker label="From" position={data.markers&&data.markers[0]&&data.markers[0]} draggable={true} onClick={() => this.props.getRoute(data.markers[0],data.markers[1])} />
        <Marker label="To" position={data.markers&&data.markers[1]&&data.markers[1]} draggable={true} onClick={() => this.props.getRoute(data.markers[0],data.markers[1])}/>
        <DirectionsRenderer directions={data.direction} />
    </div>)
    }
}

export default connect(
  state => ({
      data:state
  }),
  dispatch => ({
    getRoute: (pos1, pos2) => {
      dispatch(addRoute(pos1, pos2))
    }
  })
)(MapAttachment);