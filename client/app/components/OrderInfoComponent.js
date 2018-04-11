import React from 'react';
import { connect } from 'react-redux';
import { addNewOrder } from '../logic'

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
                <h5> It is on the way from {data.departurePoint.address} to {data.arrivalPoint.address}</h5>
                <h4> When your order will be delivered, you will receive letter on your email : {data.email}!</h4>
          </div>
        );
    }
}

export default connect(
    state => ({
        data: state
    })
)(InputComponent);