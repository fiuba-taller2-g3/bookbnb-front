import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Home from "../controllers/home/HomeV2";
import Login from "../controllers/login/Login";
import {PrivateRoute} from "./PrivateRoute";
import tokenChecker from '../utils/TokenChecker';

class Routes extends Component {
    render() {
        return (
            <Router key="router">
                <Route exact path={"/"} render={props => tokenChecker() ?
                    <Redirect to={{pathname: "/home"}}/> :
                    <Login {...props}/>
                }/>
                <PrivateRoute exact path={"/home"} component={Home}/>
            </Router>
        )
    }
}

export default Routes;