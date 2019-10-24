import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { AuthLayout } from './layouts/Auth';
import { AdminLayout } from './layouts/Admin';
import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
import "assets/css/argon-dashboard-react.css";

// placeholder value
const isAuthenticated = false;

ReactDOM.render(
    <BrowserRouter>
        <Switch>
        <Route path="/" render={props => <AuthLayout {...props}/>}/>
        <Route path="/admin" render={props => <AdminLayout {...props} />} />
        </Switch>
        {(isAuthenticated) ? <Redirect from="/" to="/admin/index"/> : <Redirect from="/" to ="/auth/login"/>}
    </BrowserRouter>
    , 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
