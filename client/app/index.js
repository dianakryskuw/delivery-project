import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';;

import HomePage from 'components/home';

const style = {
	content: {
		margin: 'auto',
		padding: '25px',
		width: '1200px',
		height: '800px',
		backgroundColor: 'rgb(244, 244, 244)'
	}
}
/*
render(
		<div style={style.content}>
			<Router history={browserHistory}>
				<Route path="/" component={HomePage}>
					<IndexRoute component={HomePage} />
				</Route>
			</Router>
		</div>,
    document.getElementById('app')
);
*/

render(
  <form action="/" method="post">
	<input type="text" name="from_lat" />
	<input type="text" name="from_lng" />
	<input type="text" name="to_lat" />
	<input type="text" name="to_lng" />
	<input type="text" name="item_name" />
	<input type="number" name="item_weight" />
	<input type="text" name="email" />
    <input type="submit" value="Submit" />
  </form> ,
   document.getElementById('app')
);