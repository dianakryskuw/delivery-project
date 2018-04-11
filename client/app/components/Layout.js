import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { resetAdding, resetTracking } from '../logic'

class Layout extends React.Component{
	constructor(props){
    super(props);
    }

    render(){
      return(
        <MuiThemeProvider>
            <div className="top">
	            <Link to='/add' className="my-link">
                    <FlatButton style={{height:'100px',color:'rgb(192, 231, 243)'}} onClick={this.props.resetTracking} className="my-button">
                        Add order
                    </FlatButton>
                </Link>
	            <Link to='/track' className="my-link">
                    <FlatButton style={{height:'100px',color:'rgb(192, 231, 243)'}} onClick={this.props.resetAdding} className="my-button">
                        Track order
                    </FlatButton>
                </Link>
            </div>
        </MuiThemeProvider>)
    }
}
export default connect(
    state => ({
    }),
    {resetAdding, resetTracking}
)(Layout);