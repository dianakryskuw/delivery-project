import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from 'react-modal'
import { resetAdding } from '../logic'

const customStyles = {
	content : {
	  top                   : '50%',
	  left                  : '50%',
	  right                 : 'auto',
	  bottom                : 'auto',
	  marginRight           : '-50%',
	  transform             : 'translate(-50%, -50%)'
	}
  };

class PopUpComponent extends React.Component{
	constructor(props){
    super(props);
    this.state = {
		modalIsOpen: false
	  };
  
	  this.openModal = this.openModal.bind(this);
	  this.afterOpenModal = this.afterOpenModal.bind(this);
	  this.closeModal = this.closeModal.bind(this);
	}
  
	openModal() {
		this.setState({modalIsOpen: true});
		this.props.onClick();
	}
  
	afterOpenModal() {
	  // references are now sync'd and can be accessed.
	  this.subtitle.style.color = '#f00';
	}
  
	closeModal() {
	  this.setState({modalIsOpen: false});
	}
  
	render() {
	  return (
			<div>
				<input id="submit-btn" onClick={this.openModal} value="Add order"/>
				{ this.props.data._id && <Modal
				isOpen={this.state.modalIsOpen}
				onAfterOpen={this.afterOpenModal}
				onRequestClose={this.closeModal}
				style={customStyles}
				>
					<h1>Thank you for your order!</h1>
					<p> You can track your order with track code {this.props.data._id} by this link:</p>
					<Link to={"track/"+this.props.data._id} onClick={this.props.resetAdding}>TRACK NOW!</Link>
					<p/>
					<button onClick={this.closeModal}>Close</button>
		  	</Modal> }
			</div>
	  );
	}
}

export default connect(
    state => ({
        data:state.orderReducer
    }),
    {resetAdding}
)(PopUpComponent);