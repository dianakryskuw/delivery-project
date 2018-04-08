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
    componentWillReceiveProps(nextProps){
      if(nextProps.data.departurePoint.lat)
      this.props.addRoute(nextProps.data.departurePoint,nextProps.data.arrivalPoint)
      if(nextProps.data.direction===null){
        const bounds = new google.maps.LatLngBounds();
        let markers = [new google.maps.LatLng(this.props.data.departurePoint.lat, this.props.data.departurePoint.lng), 
                       new google.maps.LatLng(this.props.data.arrivalPoint.lat, this.props.data.arrivalPoint.lng)];
        for (var i = 0; i < markers.length; i++) {
          bounds.extend(markers[i]);
         }
         this.props.data.map?this.props.data.map.fitBounds(bounds):{};
        }
    }
    render(){
      var data = this.props.data;
      return(
        <div>
            {data.departurePoint.lat&&<Marker label="From" position={data.departurePoint}
            />}
            {data.arrivalPoint.lat&&<Marker label="To" position={data.arrivalPoint} />}
            {data.direction&&<DirectionsRenderer directions={data.direction} />}
        </div>
      );
    }
}

export default connect(
  state => ({
      data:state.mapReducer
  }),
 {addRoute}
)(MapAttachment);