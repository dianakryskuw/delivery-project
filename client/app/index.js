
import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import Routes from './routes'

import HomePage from 'components/home';
import GoogleApiWrapper from 'components/GoogleApiWrapper';

ReactDOM.render(
 <Routes />,
 document.getElementById('app')
);

/*
render(
  <form action="/" method="post">
	<input type="text" name="item_name" />
	<input type="number" name="item_weight" />
	<input type="text" name="email" />
    <input type="submit" value="Submit" />
  </form> ,
   document.getElementById('app')
);
*/