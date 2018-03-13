import React from 'react';
import { connect } from 'react-redux';
import MapAttachment from './MapAttachment';
const _ = require("lodash");
const { compose, withProps, lifecycle } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  DirectionsRenderer
} = require("react-google-maps");
const { SearchBox } = require("react-google-maps/lib/components/places/SearchBox");


class MapWithASearchBox extends React.Component{
  constructor(props){
    super(props);
  }

render(){
  const MapWithASearchBox = compose(
    withProps({
      googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAoT2e9ISl-I6CU8tBpxzo0MFAEpka8Wc4&v=3.exp&libraries=geometry,drawing,places",
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `800px` }} />,
      mapElement: <div style={{ height: `100%` }} />,
    }),
    lifecycle({
      componentWillMount() {
        const refs = {}
  
        this.setState({
          bounds: null,
          center: {
            lat: 49.84075020419229, lng: 24.030532836914062
          },
          marker1: {},
          marker2: {},
          directions:{},
          onMapMounted: ref => {
            refs.map = ref;
          },
          onBoundsChanged: () => {
            this.setState({
              bounds: refs.map.getBounds(),
              center: refs.map.getCenter(),
            })
          },
          onSearchBoxMounted: ref => {
            refs.searchBox = ref;
          },
          onMapClick:(e)=>{
            const nextMarker = {position: e.latLng}
            const nextCenter = _.get(nextMarker, '0.position', this.state.center);

            this.setState({
              center: nextCenter,
              marker1:this.state.marker2,
              marker2:nextMarker
            })
            if(this.state.marker1.position){
              const DirectionsService = new google.maps.DirectionsService();
              DirectionsService.route({
                origin: new google.maps.LatLng(+this.state.marker1.position.lat(), +this.state.marker1.position.lng()),
                destination: new google.maps.LatLng(+this.state.marker2.position.lat(), +this.state.marker2.position.lng()),
                travelMode: google.maps.TravelMode.DRIVING,
              }, (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {   
                  this.setState({
                    directions: result,
                  });
                  this.props.getMapAddress(result);
                } 
                else {
                  alert("Can''t create route, please check your map data");
                }
              });
            }
            else{
            
            var geocoder = new google.maps.Geocoder();
              geocoder.geocode({
                'latLng': e.latLng
              }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                  if (results[0]) {
                    let addressData={
                      lat:e.latLng.lat(),
                      lng:e.latLng.lng(),
                      address:results[0].formatted_address
                    }
                  this.props.getClick(addressData);
                  }
                }
            }.bind(this));
          }
          },

          onPlacesChanged: () => {
            const places = refs.searchBox.getPlaces();
            const bounds = new google.maps.LatLngBounds();
  
            places.forEach(place => {
              if (place.geometry.viewport) {
                bounds.union(place.geometry.viewport)
              } else {
                bounds.extend(place.geometry.location)
              }
            });
            const nextMarkers = places.map(place => ({
              position: place.geometry.location,
            }));
            const nextCenter = _.get(nextMarkers, '0.position', this.state.center);
            this.setState({
              center: nextCenter
            });
          },
        })
      },
    }),
    withScriptjs,
    withGoogleMap
  )(props =>
    <GoogleMap
      ref={props.onMapMounted}
      defaultZoom={7}
      center={props.center}
      onBoundsChanged={props.onBoundsChanged}
      onClick={props.onMapClick}
    >
      <SearchBox
        ref={props.onSearchBoxMounted}
        bounds={props.bounds}
        controlPosition={google.maps.ControlPosition.TOP_LEFT}
        onPlacesChanged={props.onPlacesChanged}
      >
        <input
          type="text"
          placeholder="Input place to search"
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
      <MapAttachment />
    </GoogleMap>
  );
        
      
      return (<MapWithASearchBox getMapAddress={this.props.getMapAddress} getClick={this.props.getClick} />);
}
};
export default connect(
  state => ({
  }),
  dispatch => ({
    getMapAddress: (currentData) => {
      dispatch({ type: '1', payload: currentData })
    }, 
    getClick: (currentData) => {
      dispatch({ type: '2', payload: currentData })
    }
  })
)(MapWithASearchBox);