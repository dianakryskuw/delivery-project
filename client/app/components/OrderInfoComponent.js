import React from 'react';
import {
    connect
} from 'react-redux';
import {
    addNewOrder
} from '../logic'
import SearchComponent from './SearchComponent.js';
import InputSpace from './InputSpace.js';
import PopUpComponent from '../components/PopUpComponent.js';

class InputComponent extends React.Component {
    constructor(props) {
        super(props);
    }

   render() {
        var data = this.props.data.trackReducer;
        return(
          <div class="info-data-container">
            <div class=" read-only">    
              <h1 className="read-only-inpt">Order information</h1>
            </div>
            <h3> Your order with {data.items?data.items[0].name:''} is coming!</h3>
            <p> It is on the way from {data.departurePoint.address} to {data.arrivalPoint.address}</p>
            <p> When your order will have been arrived you will receive letter on your email : {data.email}!</p>
          </div>
        );
    }
}

export default connect(
    state => ({
        data: state
    })
)(InputComponent);