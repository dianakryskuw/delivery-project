import React from 'react';
import { connect } from 'react-redux';
import MapAttachment from './MapAttachment';
import { addDirectionData, addAddressData, addMarker } from '../actions/mapActions';
import getGeoLocation from '../helpers/geoLocation';
import buildDirection from '../helpers/directionBuilder';
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
var Promise = require('promise');

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
            })
          this.props.getMarker(e);
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
        
      
      return (<MapWithASearchBox getMarker={this.props.getMarker}/>);
}
};
export default connect(
  state => ({
  }),
  dispatch => ({
    getMarker: (m) => {
      dispatch(addMarker(m))
    }
  })
)(MapWithASearchBox);