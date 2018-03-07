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

export default class RenderMap extends React.Component{
    constructor(props){
      super(props);
    }
render(){
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
                console.log(this.props);
                const DirectionsService = new google.maps.DirectionsService();
          
                DirectionsService.route({
                  origin: new google.maps.LatLng(this.props.olat, this.props.olng),
                  destination: new google.maps.LatLng(this.props.dlat, this.props.dlng),
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
              },
          })
        )(props =>
            <GoogleMap
            defaultZoom={7}
            defaultCenter={new google.maps.LatLng(41.8507300, -87.6512600)}
          >
        {props.directions && <DirectionsRenderer directions={props.directions} />}
          </GoogleMap>
        );
        
      
      return (<MapWithASearchBox olat={this.props.olat}
                                 olng={this.props.olng}
                                 dlat={this.props.dlat}
                                 dlng={this.props.dlng}/>);
}
};