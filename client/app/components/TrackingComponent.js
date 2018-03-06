import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RenderMap from './MapWithASearchBox';

const TrackingComponent = () => (
    <form action="/trackorder" method="get"> 
    <div class="track-input">
        <div class="group">      
            <input type="text" name="order" required />
            <span class="highlight"></span>
            <span class="bar"></span>
            <label>Name</label>
        </div>
    </div>
	<div class="button-container">
        <input id="submit-btn" type="submit" value="Track"/>
    </div>
    <div className="track-map-container">
        <RenderMap/>
    </div>
    </form> 
);

export default ()=>(
<TrackingComponent />
);