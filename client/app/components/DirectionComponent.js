import React from 'react';
const _ = require("lodash");
const { compose, withProps, lifecycle } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  DirectionsRenderer
} = require("react-google-maps");
import { connect } from 'react-redux';

class DirectionComponent extends React.Component{
    constructor(props){
      super(props);
    }
render(){
  var data = this.props.data.trackReducer;
    const MapWithASearchBox = compose(
        withProps({
          googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAoT2e9ISl-I6CU8tBpxzo0MFAEpka8Wc4&libraries=geometry,drawing,places",
          loadingElement: <div style={{ height: `100%` }} />,
          containerElement: <div style={{ height: `800px` }} />,
          mapElement: <div style={{ height: `100%` }} />,
        }),
        withScriptjs,
        withGoogleMap,
        lifecycle({
            componentDidMount() {
              if(data.departure_point){
                const DirectionsService = new google.maps.DirectionsService();
                DirectionsService.route({
                  origin: new google.maps.LatLng(data.departure_point.lat, data.departure_point.lng),
                  destination: new google.maps.LatLng(data.arrival_point.lat, data.arrival_point.lng),
                  travelMode: google.maps.TravelMode.DRIVING,
                }, (result, status) => {
                  if (status === google.maps.DirectionsStatus.OK) {
                    this.setState({
                      directions: result,
                    });
                  } else {
                    console.error(`error fetching directions ${result}`);
                  }
                });
              }
              },
          })
        )(props =>
            <GoogleMap
            defaultZoom={7}
            defaultCenter={new google.maps.LatLng(49.84075020419229, 24.030532836914062)}
          >
        {props.directions && <DirectionsRenderer directions={props.directions} />}
          </GoogleMap>
        );
        
      
      return (<MapWithASearchBox data={this.props.data} />);
}
};

export default connect(
  state => ({
    data: state
  })
)(DirectionComponent);