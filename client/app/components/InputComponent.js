import React from 'react';
import { connect } from 'react-redux';
import { addNewOrder } from '../actions/orderActions.js'
import SearchComponent from './SearchComponent.js';
import InputSpace from './InputSpace.js';
import PopUpComponent from '../components/PopUpComponent/PopUpComponent.js';

class InputComponent extends React.Component{
	constructor(props){
    super(props);
    this.sendData=this.sendData.bind(this);
    }

    sendData(){
      this.mapInfo = this.props.data.mapReducer,
      this.props.addOrderData(
        {
          departure_point: this.mapInfo.markers[0],
          arrival_point: this.mapInfo.markers[1],
          distance: this.mapInfo.distance,
          time: this.mapInfo.time,
          email:this.email,
          items:[
            {
              name: this.item_name,
              weight: this.item_weight
            }
          ]
        }
        );
  }

    render(){
    var data = this.props.data.mapReducer;
    return <div>
     
     <div class=" read-only">    
      <h1 className="read-only-inpt">Order information</h1>
    </div>
      <InputSpace name= "Name" type="text" onChange={(e)=>this.item_name=e.target.value} />
      <InputSpace name= "Weight" type="number" onChange={(e)=>this.item_weight=e.target.value} />
      <InputSpace name= "Email" type="email" onChange={(e)=>this.email=e.target.value} />


  <SearchComponent text={(data.markers&&data.markers[0])?data.markers[0].address:''} type='From' required/>
<div class="read-only">   
      <input type="text" className="read-only-inpt" value={(data.markers&&data.markers[0])?+data.markers[0].lat:''} required readOnly />
      <input type="text" className="read-only-inpt" value={(data.markers&&data.markers[0])?data.markers[0].lng:''} required readOnly />
      <span class="highlight"></span>
      <span class="bar"></span>
    </div>


  <SearchComponent text={(data.markers&&data.markers[1])?data.markers[1].address:''} type='To' required/>
<div class="read-only">   
      <input type="text" className="read-only-inpt" value={(data.markers&&data.markers[1])?data.markers[1].lat:''} required readOnly />
      <input type="text" className="read-only-inpt" value={(data.markers&&data.markers[1])?data.markers[1].lng:''} required readOnly />
      <span class="highlight"></span>
      <span class="bar"></span>
    </div>

    <PopUpComponent />
    
    <div class="read-only">      
      <input type="text" className="read-only-inpt" value={data.distance?data.distance.text:''} required readOnly />
      <input type="text" className="read-only-inpt" value={data.time?data.time.text:''} required readOnly />
      <span class="highlight"></span>
      <span class="bar"></span>
    </div>
	<div class="button-container">
    <input id="submit-btn" type="submit" value="Submit"  onClick={this.sendData} />
    </div>
  </div>;
    }
}
export default connect(
  state => ({
    data:state
  }),
  dispatch => ({
    addOrderData: (currentData) => {
        dispatch(addNewOrder(currentData));
    }
  })
)(InputComponent);