import React from 'react';
import { connect } from 'react-redux';
import { assyncGet } from '../actions/trackActions.js'

class InputTrackComponent extends React.Component{
    constructor(props){
        super(props);
        this.getData=this.getData.bind(this);
        this.val=''
      }

    getData(){
        this.props.trackData(this.val);
    }
    
    render(){	
        return(
            <div className="track-inpt">
                <div class=" read-only">    
                    <h1 className="read-only-inpt">Track your order</h1>
                </div>
                <div class="group">      
                    <input type="text" onChange={(e)=>this.val=e.target.value} required />
                    <span class="highlight"></span>
                    <span class="bar"></span>
                    <label>Track Code</label>
                </div>
	            <div class="button-container">
                    <input id="submit-btn" type="submit" onClick={this.getData} value="Track"/>
                </div> 
            </div>
        );
    }
}

export default connect(
    state => ({
    }),
    dispatch => ({
      trackData: (currentData) => {
          dispatch(assyncGet(currentData));
      }
    })
  )(InputTrackComponent);
