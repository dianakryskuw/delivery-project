
import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import Routes from './routes';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import reducer from './reducers';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';


const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

console.log(store.getState())
ReactDOM.render(
<Provider store={store}>
    <Routes/>
</Provider>,
 document.getElementById('root')
);