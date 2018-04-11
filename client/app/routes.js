import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TrackingComponent from './components/TrackingComponent';
import AddingComponent from './components/AddingComponent';
import MapWithASearchBox from './components/MapWithASearchBox';
import DirectionComponent from './components/DirectionComponent';
import Layout from './components/Layout';

export default () =>(
<BrowserRouter>
    <div className="home">
    <Layout />
    <Switch>
        <Route path="/" exact component={AddingComponent} /> 
        <Route path="/add" exact component={AddingComponent} /> 
        <Route path='/track' exact component={TrackingComponent} />
        <Route path='/track/:id' exact render={(props)=>(<TrackingComponent {...props} />)} />
    </Switch>
    </div>
</BrowserRouter>
);