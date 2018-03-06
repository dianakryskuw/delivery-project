import React from 'react';
const _ = require("lodash");
const { compose, withProps, lifecycle } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} = require("react-google-maps");
const { SearchBox } = require("react-google-maps/lib/components/places/SearchBox");


var current_location={ lat: 49.397, lng: 24.644 };

export default class RenderMap extends React.Component{
    constructor(props){
      super(props);
      this.func=this.func.bind(this);
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
    const MapWithASearchBox = compose(
        withProps({
          googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAoT2e9ISl-I6CU8tBpxzo0MFAEpka8Wc4&libraries=geometry,drawing,places",
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
                lat: 41.9, lng: -87.624
              },
              markers: [],
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
                    center: nextCenter,
                    markers: nextMarkers,
                  });
                  // refs.map.fitBounds(bounds);
                },
              })
            },
          }),
          withScriptjs,
          withGoogleMap
        )(props =>
          <GoogleMap
            ref={props.onMapMounted}
            defaultZoom={15}
            center={props.center}
            onBoundsChanged={props.onBoundsChanged}
            onClick={this.func}
          >
            <SearchBox
              ref={props.onSearchBoxMounted}
              bounds={props.bounds}
              controlPosition={google.maps.ControlPosition.TOP_LEFT}
              onPlacesChanged={props.onPlacesChanged}
            >
              <input
                type="text"
                placeholder="Enter departure place"
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
            <SearchBox
              ref={props.onSearchBoxMounted}
              bounds={props.bounds}
              controlPosition={google.maps.ControlPosition.TOP_RIGHT}
              onPlacesChanged={props.onPlacesChanged}
            >
              <input
                type="text"
                placeholder="Enter arrival place"
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
            {props.markers.map((marker, index) =>
              <Marker key={index} position={marker.position} />
            )}
          </GoogleMap>
        );
        
      
      return (<MapWithASearchBox />);
}
};