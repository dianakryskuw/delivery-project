import React from 'react';
import { connect } from 'react-redux';
import { addNewOrder } from '../actions/orderActions.js'

class InputComponent extends React.Component{
	constructor(props){
    super(props);
    this.sendData=this.sendData.bind(this);
    }

    sendData(){
      this.mapInfo = this.props.data.mapReducer,
      this.props.addOrderData(
        {
          departure_point: this.mapInfo.from,
          arrival_point: this.mapInfo.to,
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

	 <div class="group">      
      <input type="text" name="item_name" onChange={(e)=>this.item_name=e.target.value} required />
      <span class="highlight"></span>
      <span class="bar"></span>
      <label>Name</label>
    </div>
      
    <div class="group">      
      <input min="1" type="number" name="item_weight"  onChange={(e)=>this.item_weight=e.target.value} required />
      <span class="highlight"></span>
      <span class="bar"></span>
      <label>Weight</label>
    </div>

	<div class="group">      
      <input type="email" name="email" onChange={(e)=>this.email=e.target.value}  required />
      <span class="highlight"></span>
      <span class="bar"></span>
      <label>Email</label>
    </div>

	<div class="read-only">      
      <input type="text" className="read-only-inpt" name="from_lat"  value={data.from?data.from.lat:''} required readOnly />
      <input type="text" className="read-only-inpt" name="from_lng" value={data.from?data.from.lng:''} required readOnly />
      <span class="highlight"></span>
      <span class="bar"></span>
    </div>

		<div class="read-only">      
      <input type="text" className="read-only-inpt" name="from_adr" value={data.from?data.from.address:''} required readOnly />
      <span class="highlight"></span>
      <span class="bar"></span>
    </div>

		<div class="read-only">      
      <input type="text" className="read-only-inpt" name="to_lat" value={data.to?data.to.lat:''} required readOnly />
      <input type="text" className="read-only-inpt" name="to_lng" value={data.to?data.to.lng:''} required readOnly />
      <span class="highlight"></span>
      <span class="bar"></span>
    </div>


		<div class="read-only">      
      <input type="text" className="read-only-inpt" name="to_adr" value={data.to?data.to.address:''} required readOnly />
      <span class="highlight"></span>
      <span class="bar"></span>
    </div>	

    <div class="read-only">      
      <input type="text" className="read-only-inpt" name="distance" value={data.distance?data.distance.text:''} required readOnly />
      <input type="text" className="read-only-inpt" name="duration" value={data.time?data.time.text:''} required readOnly />
      <span class="highlight"></span>
      <span class="bar"></span>
    </div>

    
    <div class="read-only">      
      <input type="text" className="read-only-inpt" name="distance_v" 
      style={{
        display: 'none'
      }} 
      value={data.distance?data.distance.value:''} required readOnly />
      <input type="text" className="read-only-inpt" name="duration_v"
      style={{
        display: 'none'
      }} 
       value={data.time?data.time.value:''} required readOnly />
      <span class="highlight"></span>
      <span class="bar"></span>
    </div>	

	<div class="button-container">
    <input id="submit-btn" type="submit" value="Submit" onClick={this.sendData} />
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