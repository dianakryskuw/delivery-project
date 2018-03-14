import React from 'react';
import { connect } from 'react-redux';
import InputComponent from './InputComponent';
import MapWithASearchBox from './MapWithASearchBox';
import { addNewOrder } from '../actions/orderActions';

class AddingComponent extends React.Component{
    constructor(props){
        super(props);
      }

    render(){
    return (
    <div> 
        <h1 style={{
            display: this.props.data.orderId ? 'block' : 'none'
        }}>{"Your track code "+this.props.data.orderId||""}</h1>
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
export default connect(
    state => ({
        data:state.orderReducer
    }),
    dispatch => ({
        orderAdded: ({}) => {
            dispatch(resetInput({}));
        }
    })
  )(AddingComponent);