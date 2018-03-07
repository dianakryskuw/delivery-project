import React from 'react';
import Api from 'components/Api';
import InputComponent from './InputComponent';
import RenderMap from './MapWithASearchBox';
import GoogleApiWrapper from './GoogleApiWrapper';

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
            <RenderMap clickLocation = {this.clickLocation}/>
        </div>
        <div className="input-data-container">
            <InputComponent points ={this.state.points }/>
        </div>
    </div>
        );
    }
}