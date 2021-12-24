import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

const Routemap = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" component={Dashboard} />
                
            </Switch>
        </Router>
    );
}

export default Routemap;
