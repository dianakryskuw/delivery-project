import React from 'react';
import InputComponent from './InputComponent';
import MapWithASearchBox from './MapWithASearchBox';

export default class AddingComponent extends React.Component{
    constructor(props){
        super(props);
        this.clickLocation=this.clickLocation.bind(this);
        this.state = {};
      }
    clickLocation (params){
        this.setState({points: params})
    }

    render(){
    return (
    <div> 
        <div className="map-container">
            <MapWithASearchBox clickLocation = {this.clickLocation}/>
        </div>
        <div className="input-data-container">
            <InputComponent />
        </div>
    </div>
        );
    }
}