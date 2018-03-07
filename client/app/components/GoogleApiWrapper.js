
import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker,TrafficLayer, DirectionsRenderer } from "react-google-maps"

var current_location={ lat: 49.397, lng: 24.644 };

export default class MyFancyComponent extends React.Component {
  constructor(props){
    super(props);
    this.func=this.func.bind(this);
  }
  state = {
    isMarkerShown: false,
    point1:[],
    point2:[],
    counter:0
  }
  
  func (e){
  current_location={lat:e.latLng.lat(), lng:e.latLng.lng()}
  let count = this.state.counter;
  count+=1;
  if(count==1){
    this.setState({
      point1:current_location,
      counter: count
    });
  }
  else{
    var from_location = this.state.point1;
    this.setState({
      point2: from_location,
      point1: current_location
    })
  }
  this.props.clickLocation([this.state.point1,this.state.point2]);
  }



  

  render() {
    const MyMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
      onClick={this.func}
      defaultZoom={10}
      defaultCenter={{lat: 49.397, lng: 24.644 }}>
      <Marker position={this.state.point1} label="From" />
      <Marker position={this.state.point2} label="To" />
    </GoogleMap>
    ))    
    return (
      <MyMapComponent
        isMarkerShown
        googleMapURL={"https://maps.googleapis.com/maps/api/js?key=AIzaSyAoT2e9ISl-I6CU8tBpxzo0MFAEpka8Wc4&v=3.exp&libraries=geometry,drawing,places"}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `700px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        isMarkerShown={this.state.isMarkerShown}
        onClick={this.func}
      />
    )
  }
}