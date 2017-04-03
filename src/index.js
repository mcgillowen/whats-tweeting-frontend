import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import AppRouter from './app-router/app-router.jsx';

ReactDOM.render(
	//Current needs to be isLoggedIn={true} to see logged-in page
	<AppRouter />,
	document.getElementById('root')
);
