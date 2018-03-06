import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import GoogleApiWrapper from 'components/GoogleApiWrapper';
import TrackingComponent from './components/TrackingComponent';
import AddingComponent from './components/AddingComponent';

export default () =>(
<BrowserRouter>
<div>
  <MuiThemeProvider>
    <div className="top">
	<FlatButton className="my-button"><Link to='/add' className="my-link">Add order</Link></FlatButton>
	<FlatButton className="my-button"><Link to='/track' className="my-link">Track order</Link></FlatButton>
    </div>
    </MuiThemeProvider>
    <Switch>
        <Route path="/add" exact component={AddingComponent} />
        <Route path="/track" exact component={TrackingComponent} />
    </Switch>
    </div>
</BrowserRouter>
);