import React from 'react';
import InputComponent from './InputComponent';
import MapWithASearchBox from './MapWithASearchBox';

export default class AddingComponent extends React.Component{
    constructor(props){
        super(props);
      }

    render(){
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