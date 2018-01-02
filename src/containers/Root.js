import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootAppReducer from '../reducers';
import Home from './Home';
import Routes from '../components/Routes';

const store = createStore(rootAppReducer) 

const Root = () => (
    <Provider store={store}>
        <Routes />
    </Provider>
)

export default Root;