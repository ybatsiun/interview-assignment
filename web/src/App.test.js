import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'

import App from './App';
import Modal from './components/modal';
import SinglePost from './components/singlePost';
import Header from './components/header';

import createRootReducer from './reducers';

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

it('app renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>, div);
});

it('modal renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <Provider store={store}>
            <Modal open={true} post={{}} />
        </Provider>, div);
});

it('single post renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <Provider store={store}>
            <SinglePost fetchedPost={{}} />
        </Provider>, div);
});

it('header renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <Provider store={store}>
            <Header />
        </Provider>, div);
});
