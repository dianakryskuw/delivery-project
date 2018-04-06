import React from 'react';
const {
    compose,
    withProps,
    lifecycle
} = require("recompose");
const {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    DirectionsRenderer
} = require("react-google-maps");
import {
    connect
} from 'react-redux';
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
                containerElement: <div style={{ height: `440px` }} />,
                mapElement: <div style={{ height: `100%` }} />,
            }),
            withGoogleMap,
            lifecycle({
                componentWillMount() {
                    buildDirection(from, to).then((result) => this.setState({
                        directions: result
                    })).catch(e => {
                        console.log('ERROR', e)
                    });
                }
            })
        )(props =>
            <GoogleMap
            defaultZoom={7}
            defaultCenter={new google.maps.LatLng(49.84075020419229, 24.030532836914062)}
            >
              <DirectionsRenderer directions={props.directions} />
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