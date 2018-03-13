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
    return(
    <div>
        <Marker label="From" position={this.props.data.from} />
        <Marker label="To" position={this.props.data.to} />
        <DirectionsRenderer directions={this.props.data.direction} />
    </div>)
    }
}

export default connect(
  state => ({
      data:state
  })
)(MapAttachment);