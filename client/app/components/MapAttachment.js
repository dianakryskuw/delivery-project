import React from 'react';
import { connect } from 'react-redux';
const {
  Marker,
  DirectionsRenderer
} = require("react-google-maps");

class MapAttachment extends React.Component{
	constructor(props){
    super(props);
    }

    render(){
    var data = this.props.data.mapReducer;
    return(
    <div>
        <Marker label="From" position={data.from} />
        <Marker label="To" position={data.to} />
        <DirectionsRenderer directions={data.direction} />
    </div>)
    }
}

export default connect(
  state => ({
      data:state
  })
)(MapAttachment);