import React from 'react';
import { connect } from 'react-redux';

class InputComponent extends React.Component{
	constructor(props){
    super(props);
    }

    render(){
    return <form action="addorder" method="post">
     
     <div class=" read-only">    
      <h1 className="read-only-inpt">Order information</h1>
    </div>

	 <div class="group">      
      <input type="text" name="item_name" required />
      <span class="highlight"></span>
      <span class="bar"></span>
      <label>Name</label>
    </div>
      
    <div class="group">      
      <input min="1" type="number" name="item_weight" required />
      <span class="highlight"></span>
      <span class="bar"></span>
      <label>Weight</label>
    </div>

	<div class="group">      
      <input type="email" name="email" required />
      <span class="highlight"></span>
      <span class="bar"></span>
      <label>Email</label>
    </div>

	<div class="read-only">      
      <input type="text" className="read-only-inpt" name="from_lat"  value={this.props.data.from?this.props.data.from.lat:''} required readOnly />
      <input type="text" className="read-only-inpt" name="from_lng" value={this.props.data.from?this.props.data.from.lng:''} required readOnly />
      <span class="highlight"></span>
      <span class="bar"></span>
    </div>

		<div class="read-only">      
      <input type="text" className="read-only-inpt" name="from_adr" value={this.props.data.from?this.props.data.from.address:''} required readOnly />
      <span class="highlight"></span>
      <span class="bar"></span>
    </div>

		<div class="read-only">      
      <input type="text" className="read-only-inpt" name="to_lat" value={this.props.data.to?this.props.data.to.lat:''} required readOnly />
      <input type="text" className="read-only-inpt" name="to_lng" value={this.props.data.to?this.props.data.to.lng:''} required readOnly />
      <span class="highlight"></span>
      <span class="bar"></span>
    </div>


		<div class="read-only">      
      <input type="text" className="read-only-inpt" name="to_adr" value={this.props.data.to?this.props.data.to.address:''} required readOnly />
      <span class="highlight"></span>
      <span class="bar"></span>
    </div>	

    <div class="read-only">      
      <input type="text" className="read-only-inpt" name="distance" value={this.props.data.distance?this.props.data.distance.text:''} required readOnly />
      <input type="text" className="read-only-inpt" name="duration" value={this.props.data.time?this.props.data.time.text:''} required readOnly />
      <span class="highlight"></span>
      <span class="bar"></span>
    </div>	

	<div class="button-container">
    <input id="submit-btn" type="submit" value="Submit" />
    </div>
  </form>;
    }
}
export default connect(
  state => ({
    data:state
  }),
  dispatch => ({
  })
)(InputComponent);