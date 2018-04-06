import React from 'react';
import {
    connect
} from 'react-redux';
import {
    addNewOrder
} from '../actions/orderActions.js'
import SearchComponent from './SearchComponent.js';
import InputSpace from './InputSpace.js';
import PopUpComponent from '../components/PopUpComponent.js';

class InputComponent extends React.Component {
    constructor(props) {
        super(props);
        this.sendData = this.sendData.bind(this);
    }

    sendData() {
        this.mapInfo = this.props.data.mapReducer,
            this.props.addOrderData({
                departurePoint: this.mapInfo.departurePoint,
                arrivalPoint: this.mapInfo.arrivalPoint,
                distance: this.mapInfo.distance,
                time: this.mapInfo.time,
                email: this.email,
                items: [{
                    name: this.item_name,
                    weight: this.item_weight
                }]
            });
    }

    render() {
        var data = this.props.data.mapReducer;
        return(
          <div>
            <div class=" read-only">    
              <h1 className="read-only-inpt">Order information</h1>
            </div>
            <InputSpace name= "Name" type="text" onChange={(e)=>this.item_name=e.target.value} />
            <InputSpace name= "Weight" type="number" onChange={(e)=>this.item_weight=e.target.value} />
            <InputSpace name= "Email" type="email" onChange={(e)=>this.email=e.target.value} />
            <SearchComponent className="searchInpt" text={data.departurePoint.address||''} type='From'/>
            <SearchComponent className="searchInpt" text={data.arrivalPoint.address||''} type='To'/>
            <InputSpace name= "Distance" type="text" value={data.distance?data.distance.text:''} readOnly/>
            <InputSpace name= "Duration" type="text" value={data.time?data.time.text:''} readOnly/>
            <div class="button-container">
              <PopUpComponent onClick={this.sendData} />
            </div>
          </div>
        );
    }
}

export default connect(
    state => ({
        data: state
    }),
    dispatch => ({
        addOrderData: (currentData) => {
            dispatch(addNewOrder(currentData));
        }
    })
)(InputComponent);