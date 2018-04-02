import React from 'react';
import { connect } from 'react-redux';

export default class InputComponent extends React.Component{
	constructor(props){
    super(props);
    }

    render(){
      return(
        <div class="group">      
          <input type={this.props.type} onChange={this.props.onChange} value={this.props.value} required />
          <span class="highlight"></span>
          <span class="bar"></span>
          <label>{this.props.name}</label>
        </div>
      );
    }
}