import React from 'react';
import { connect } from 'react-redux';
import InputComponent from './InputComponent';
import MapWithASearchBox from './MapWithASearchBox';

class AddingComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div>
            <div className="map-container">
                <MapWithASearchBox/>
            </div>
            <div className="input-data-container">
                <InputComponent/>
            </div>
        </div>
        );
    }
}
export default AddingComponent