import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

class PopUpComponent extends React.Component{
	constructor(props){
    super(props);
    }

    render(){
			return(
				<div>
	            <div class="button-container">
                    <input id="submit-btn" data-toggle="modal" data-target="#myModal" onClick={this.props.onClick} value="Add order"/>
                </div> 
  				<div class="modal fade" id="myModal" role="dialog">
	  				<div class="modal-dialog">
							<div class="modal-content">
		  					<div class="modal-header">
									<button type="button" class="close" data-dismiss="modal">&times;</button>
									<h4 class="modal-title">Your order wass sent</h4>
		  					</div>
		  					<div class="modal-body">
									<p>Thank you for your order. You can track your order with track code {this.props.data.orderId} by this link:</p>
									
        								<div class="modal-footer">
										<Link to={"track/"+this.props.data.orderId}data-toggle="modal" >TRACK NOW!</Link>
									</div>
		  					</div>
								<div class="modal-footer">
									<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
								</div>
							</div>
						</div>
	  			</div>
				</div>
			)
    }
}
export default connect(
    state => ({
        data:state.orderReducer
    })
)(PopUpComponent);