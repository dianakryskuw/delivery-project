import React from 'react';
import {
    connect
} from 'react-redux';
import MapAttachment from './MapAttachment';
import {
    addMarker, addMap
} from '../logic';
const _ = require("lodash");
const {
    compose,
    withProps,
    lifecycle
} = require("recompose");
const {
    withScriptjs,
    withGoogleMap,
    GoogleMap
} = require("react-google-maps");
const {
    SearchBox
} = require("react-google-maps/lib/components/places/SearchBox");

class MapWithASearchBox extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const MapWithASearchBox = compose(
            withProps({
                loadingElement: <div style={{ height: `100%` }} />,
                containerElement: <div style={{ height: `100%` }} />,
                mapElement: <div style={{ height: `100%` }} />,
            }),
            lifecycle({
                componentWillMount() {
                    const refs = {}

                    this.setState({
                        bounds: null,
                        center: {
                            lat: 48.0,
                            lng: 34.0
                        },
                        directions: {},
                        onMapMounted: ref => {
                            refs.map = ref;
                            this.props.addMap(ref);
                        },
                        onSearchBoxMounted: ref => {
                            refs.searchBox = ref;
                        },
                        onMapClick: (e) => {
                            const nextMarker = {
                                position: e.latLng
                            }
                            const nextCenter = _.get(nextMarker, '0.position', this.state.center);
                            this.setState({
                                center: nextCenter,
                            })
                            this.props.addMarker(e);
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
            withGoogleMap
        )(props =>
            <GoogleMap
              ref={props.onMapMounted}
              defaultZoom={6}
              center={props.center}
              onClick={props.onMapClick}
              defaultOptions={{styles:[{"featureType":"all","elementType":"labels","stylers":[{"lightness":63},{"hue":"#ff0000"}]},{"featureType":"administrative","elementType":"all","stylers":[{"hue":"#000bff"},{"visibility":"on"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"administrative","elementType":"labels","stylers":[{"color":"#4a4a4a"},{"visibility":"on"}]},{"featureType":"administrative","elementType":"labels.text","stylers":[{"weight":"0.01"},{"color":"#727272"},{"visibility":"on"}]},{"featureType":"administrative.country","elementType":"labels","stylers":[{"color":"#ff0000"}]},{"featureType":"administrative.country","elementType":"labels.text","stylers":[{"color":"#ff0000"}]},{"featureType":"administrative.country","elementType":"labels.text.fill","stylers":[{"color":"#630a0a"}]},{"featureType":"administrative.province","elementType":"geometry.fill","stylers":[{"visibility":"on"}]},{"featureType":"administrative.province","elementType":"labels.text","stylers":[{"color":"#545454"}]},{"featureType":"administrative.locality","elementType":"labels.text","stylers":[{"visibility":"on"},{"color":"#737373"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text","stylers":[{"color":"#7c7c7c"},{"weight":"0.01"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text","stylers":[{"color":"#404040"}]},{"featureType":"landscape","elementType":"all","stylers":[{"lightness":16},{"hue":"#ff001a"},{"saturation":-61}]},{"featureType":"poi","elementType":"labels.text","stylers":[{"color":"#828282"},{"weight":"0.01"}]},{"featureType":"poi.business","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#100b0b"}]},{"featureType":"poi.government","elementType":"geometry.fill","stylers":[{"color":"#361414"},{"visibility":"on"}]},{"featureType":"poi.government","elementType":"labels.text","stylers":[{"color":"#4c4c4c"}]},{"featureType":"poi.park","elementType":"all","stylers":[{"hue":"#00ff91"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#ddee93"}]},{"featureType":"poi.park","elementType":"labels.text","stylers":[{"color":"#7b7b7b"}]},{"featureType":"road","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#e8c0aa"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels.text","stylers":[{"color":"#999999"},{"visibility":"on"},{"weight":"0.01"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"hue":"#ff0011"},{"lightness":53}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#eaad85"}]},{"featureType":"road.highway","elementType":"labels.text","stylers":[{"color":"#626262"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#d08d8d"}]},{"featureType":"transit","elementType":"labels.text","stylers":[{"color":"#676767"},{"weight":"0.01"}]},{"featureType":"water","elementType":"all","stylers":[{"hue":"#0055ff"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#537582"}]}]}}
            >
              <SearchBox
                ref={props.onSearchBoxMounted}
                bounds={props.bounds}
                controlPosition={google.maps.ControlPosition.TOP_LEFT}
                onPlacesChanged={props.onPlacesChanged}
              >
                <input
                  type="text"
                  placeholder="Search place"
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
              <MapAttachment/>
            </GoogleMap>
        );
        return (
          <MapWithASearchBox addMarker={this.props.addMarker} addMap={this.props.addMap}/>
        );
    }
};

export default connect(
    state => {},
    {addMarker, addMap}
)(MapWithASearchBox);