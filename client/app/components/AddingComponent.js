import React from 'react';
import InputComponent from './InputComponent';
import MapWithASearchBox from './MapWithASearchBox';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

function transportData(state={}, action) {
    if (action.type === '1') {
        return action.payload;
    }
    return state;
  }
  
const store = createStore(transportData);

export default class AddingComponent extends React.Component{
    constructor(props){
        super(props);
        this.clickLocation=this.clickLocation.bind(this);
      }
    clickLocation (params){
        this.inputData=params;
    }

    render(){
    return (
        <Provider store={store}>
    <div> 
        <div className="map-container">
            <MapWithASearchBox/>
        </div>
        <div className="input-data-container">
            <InputComponent/>
        </div>
    </div>
        </Provider>
        );
    }
}