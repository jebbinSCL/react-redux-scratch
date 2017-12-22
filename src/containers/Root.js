import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootAppReducer from '../reducers';
import Header from './Header';
import Home from './Home';

const store = createStore(rootAppReducer) 

const Root = () => (
    <Provider store={store}>
        <div>
            <Header />
            <Home />
        </div>
    </Provider>
)

export default Root