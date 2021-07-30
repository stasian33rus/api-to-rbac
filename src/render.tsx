import React from 'react';
import ReactDOM from 'react-dom';
import { Home } from './app/routes/Home';
import { store } from './app/store';
import { Provider } from 'react-redux';

ReactDOM.render(
    <Provider store={store}>
        <Home />
    </Provider>,

    document.getElementById('root'),
);
