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
