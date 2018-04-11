import React from 'react';
const {
    compose,
    withProps,
    lifecycle
} = require("recompose");
const {
    withGoogleMap,
    GoogleMap,
    DirectionsRenderer
} = require("react-google-maps");
import { connect } from 'react-redux';
import buildDirection from '../helpers/directionBuilder';

class DirectionComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var from = this.props.data.departurePoint;
        var to = this.props.data.arrivalPoint;
        const DirectionComponent = compose(
            withProps({
                loadingElement: <div style={{ height: `100%` }} />,
                containerElement: <div style={{ height: `100%` }} />,
                mapElement: <div style={{ height: `100%` }} />,
            }),
            withGoogleMap,
            lifecycle({
                componentWillMount() {
                    buildDirection(from, to).then((result) => this.setState({
                        directions: result
                    }))
                }
            })
        )(props =>
            <GoogleMap
                defaultZoom={5}
                defaultCenter={new google.maps.LatLng(49.84075020419229, 24.030532836914062)}
                defaultOptions={{styles:[{"featureType":"all","elementType":"labels","stylers":[{"lightness":63},{"hue":"#ff0000"}]},{"featureType":"administrative","elementType":"all","stylers":[{"hue":"#000bff"},{"visibility":"on"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"administrative","elementType":"labels","stylers":[{"color":"#4a4a4a"},{"visibility":"on"}]},{"featureType":"administrative","elementType":"labels.text","stylers":[{"weight":"0.01"},{"color":"#727272"},{"visibility":"on"}]},{"featureType":"administrative.country","elementType":"labels","stylers":[{"color":"#ff0000"}]},{"featureType":"administrative.country","elementType":"labels.text","stylers":[{"color":"#ff0000"}]},{"featureType":"administrative.country","elementType":"labels.text.fill","stylers":[{"color":"#630a0a"}]},{"featureType":"administrative.province","elementType":"geometry.fill","stylers":[{"visibility":"on"}]},{"featureType":"administrative.province","elementType":"labels.text","stylers":[{"color":"#545454"}]},{"featureType":"administrative.locality","elementType":"labels.text","stylers":[{"visibility":"on"},{"color":"#737373"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text","stylers":[{"color":"#7c7c7c"},{"weight":"0.01"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text","stylers":[{"color":"#404040"}]},{"featureType":"landscape","elementType":"all","stylers":[{"lightness":16},{"hue":"#ff001a"},{"saturation":-61}]},{"featureType":"poi","elementType":"labels.text","stylers":[{"color":"#828282"},{"weight":"0.01"}]},{"featureType":"poi.business","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#100b0b"}]},{"featureType":"poi.government","elementType":"geometry.fill","stylers":[{"color":"#361414"},{"visibility":"on"}]},{"featureType":"poi.government","elementType":"labels.text","stylers":[{"color":"#4c4c4c"}]},{"featureType":"poi.park","elementType":"all","stylers":[{"hue":"#00ff91"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#ddee93"}]},{"featureType":"poi.park","elementType":"labels.text","stylers":[{"color":"#7b7b7b"}]},{"featureType":"road","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#e8c0aa"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels.text","stylers":[{"color":"#999999"},{"visibility":"on"},{"weight":"0.01"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"hue":"#ff0011"},{"lightness":53}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#eaad85"}]},{"featureType":"road.highway","elementType":"labels.text","stylers":[{"color":"#626262"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#d08d8d"}]},{"featureType":"transit","elementType":"labels.text","stylers":[{"color":"#676767"},{"weight":"0.01"}]},{"featureType":"water","elementType":"all","stylers":[{"hue":"#0055ff"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#537582"}]}]}}
            >
                {props.directions && <DirectionsRenderer directions={props.directions} /> }
            </GoogleMap>
        );
        return (
          <DirectionComponent data={this.props.data} />
        );
    }
};

export default connect(
    state => ({
        data: state.trackReducer
    })
)(DirectionComponent);