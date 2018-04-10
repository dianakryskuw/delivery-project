import React from 'react';
import { connect } from 'react-redux';
import { trackByCode } from '../logic'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import InputSpace from './InputSpace'
class InputTrackComponent extends React.Component{
    constructor(props){
        super(props);
        this.getData=this.getData.bind(this);
        this.setData=this.setData.bind(this);
        this.state={val:this.props.trackCode}
        this.state.val&&this.getData()
      }
    getData(){
        this.props.trackByCode(this.state.val);
    }
    setData(e){
        this.setState({
            val:e.target.value
        })
    }
    render(){	
        return(
            <div className="track-inpt">
                <div class=" read-only">    
                    <h1 className="read-only-inpt">Track your order</h1>
                </div>
                <InputSpace name= "Track Code" type="text" value={this.state.val} onChange={this.setData} />
	            <div class="button-container">
                    <Link to={"/track/"+this.state.val} >
                    <input id="submit-btn" type="submit" onClick={this.getData} value="Track"/>
                    </Link>
                </div> 
            </div>
        );
    }
}

export default connect(
    state => ({
        data:state
    }),
    {trackByCode}
  )(InputTrackComponent);
