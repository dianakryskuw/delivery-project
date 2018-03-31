import React from 'react';
import { connect } from 'react-redux';
import './PopUpComponent.css';

export default class PopUpComponent extends React.Component{
	constructor(props){
    super(props);
    }

    render(){
        
    return(
        <div>
		<input type="checkbox" id="popup__1" class="popup__check" />
		<div class="popup__base">
			<label for="popup__1" class="popup__bg"></label>
			<div class="popup__inner">
				<div class="popup__calign">
					<label for="popup__1" class="popup__close">+</label>
				</div>
				<div class="popup__textbox">
					<h1>Lorem Ipsum</h1>
					<p/>
						ORDER
					<p/>
				</div>
			</div>
		</div>
		<label class="trigger" for="popup__1">Click me!</label>
        </div> )
    }
}