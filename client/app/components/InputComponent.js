import React from 'react';
import GoogleApiWrapper from 'components/GoogleApiWrapper';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class InputComponent extends React.Component{
	constructor(props){
		super(props);
    }
    state={
      points:this.props.points
    }
    render(){
      console.log(this.props);
    return <form action="/addorder" method="post">

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

	<div class=" read-only">      
		<div class="input-inline">   
      <input type="text" id="inpt1" className="read-only-inpt" name="from_lat" required readOnly />
      <input type="text" id="inpt2" className="read-only-inpt" name="from_lng" required readOnly />
	  </div>
      <span class="highlight"></span>
      <span class="bar"></span>
    </div>


		<div class=" read-only">      
		<div class="input-inline">
      <input type="text" id="inpt3" className="read-only-inpt" name="to_lat" required readOnly />
      <input type="text" id="inpt4" className="read-only-inpt" name="to_lng" required readOnly />
	  </div>
      <span class="highlight"></span>
      <span class="bar"></span>
    </div>

	
	<div class="button-container">
    <input id="submit-btn" type="submit" value="Submit" />
    </div>
  </form>;
    }
}