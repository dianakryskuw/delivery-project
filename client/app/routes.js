import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TrackingComponent from './components/TrackingComponent';
import AddingComponent from './components/AddingComponent';

export default () =>(
<BrowserRouter>
    <div className="home">
        <MuiThemeProvider>
    <div className="top">
	<Link to='/add' className="my-link"><FlatButton style={{height:'100px',color:'rgb(192, 231, 243)'}} className="my-button">Add order</FlatButton></Link>
	<Link to='/track' className="my-link"><FlatButton style={{height:'100px',color:'rgb(192, 231, 243)'}} className="my-button">Track order</FlatButton></Link>
   </div>
    </MuiThemeProvider>
    <Switch>
        <Route path="/" exact component={AddingComponent} /> 
        <Route path="/add" exact component={AddingComponent} /> 
        <Route path='/track' component={TrackingComponent} />
        <Route path='/track/:id' component={TrackingComponent} />
    </Switch>
    </div>
</BrowserRouter>
);