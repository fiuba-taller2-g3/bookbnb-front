import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import {Home} from "../controllers/home/Home";
import Login from "../controllers/login/Login";
import Register from "../controllers/register/Register";
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
                <PrivateRoute exact path={"/register"} component={Register}/>
            </Router>
        )
    }
}

export default Routes;