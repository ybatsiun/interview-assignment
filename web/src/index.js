import React from 'react';
import * as serviceWorker from './serviceWorker';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux';
import createRootReducer from './reducers';
import App from './App';

const enhancers = []
const middleware = [thunk];

const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
);
 
export const store = createStore(
    createRootReducer(),
    {},
    composedEnhancers
);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
