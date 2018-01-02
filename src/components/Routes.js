import React from 'react';
import { 
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import Home from '../containers/Home';
import About from './About';
import Header from '../containers/Header';

const Routes = () => (
    <Router>
        <div>
            <Header />
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route exact path='/about' component={About}/>
            </Switch>
        </div>
    </Router>
);

export default Routes;