import React from 'react';
import { connect } from 'react-redux';
import { trackByCode } from '../logic'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import InputSpace from './InputSpace'
class InputTrackComponent extends React.Component{
    constructor(props){
        super(props);
        this.getData=this.getData.bind(this);
        this.val=this.props.trackCode||'';
      }

    getData(){
        this.props.trackByCode(this.val);
    }
    
    render(){	
        return(
            <div className="track-inpt">
                <div class=" read-only">    
                    <h1 className="read-only-inpt">Track your order</h1>
                </div>
                <InputSpace name= "Track Code" type="text" onChange={(e)=>this.val=e.target.value} />
	            <div class="button-container">
                    <Link to={this.val} >
                    <input id="submit-btn" type="submit" onClick={this.getData} value="Track"/>
                    </Link>
                </div> 
            </div>
        );
    }
}

export default connect(
    state => ({
    }),
    {trackByCode}
  )(InputTrackComponent);
