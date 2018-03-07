import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker,TrafficLayer, DirectionsRenderer } from "react-google-maps"
const { SearchBox } = require("react-google-maps/lib/components/places/SearchBox");
  
var current_location={ lat: 49.397, lng: 24.644 };
export default class MapComponent extends React.Component{  
    constructor(props){
        super(props);
      }
      state = {
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

render(){
    const MapWithAMarker = withScriptjs(withGoogleMap(props =>
        <GoogleMap
          onClick={this.func}
          defaultZoom={10}
          defaultCenter={{lat: 49.397, lng: 24.644 }} 
          ref={this.props.onMapMounted}
          center={this.props.center}
          onBoundsChanged={this.props.onBoundsChanged}>
          <SearchBox
          ref={this.props.onSearchBoxMounted}
          bounds={this.props.bounds}
          onPlacesChanged={this.props.onPlacesChanged}
        >
          <input
            type="text"
            placeholder="Customized your placeholder"
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `240px`,
              height: `32px`,
              marginTop: `27px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
            }}
          />
        </SearchBox>
        {this.props.markers.map((marker, index) =>
          <Marker key={index} position={marker.position} />
        )}
          <Marker position={this.state.point1} label="From" />
          <Marker position={this.state.point2} label="To" />
        </GoogleMap>));
        return <MapWithAMarker 
        googleMapURL={this.props.googleMapURL}
        loadingElement={this.props.loadingElement}
        containerElement={this.props.containerElement}
        mapElement={this.props.mapElement} />;
    }
}