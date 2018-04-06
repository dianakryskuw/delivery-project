import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Modal from 'react-modal'

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
		  <button onClick={this.openModal}>    <input id="submit-btn" data-toggle="modal" data-target="#myModal" onClick={this.props.onClick} value="Add order"/>
                </button>
		  <Modal
			isOpen={this.state.modalIsOpen}
			onAfterOpen={this.afterOpenModal}
			onRequestClose={this.closeModal}
			style={customStyles}
			contentLabel="Example Modal"
		  >

			<p>Thank you for your order. You can track your order with track code {this.props.data.orderId} by this link:</p>
			
				<Link to={"track/"+this.props.data.orderId}>TRACK NOW!</Link>
			<button onClick={this.closeModal}>close</button>
		  </Modal>
		</div>
	  );
	}
  }
export default connect(
    state => ({
        data:state.orderReducer
    })
)(PopUpComponent);