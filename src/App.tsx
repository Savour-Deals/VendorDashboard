import React from "react";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import  { Login }  from "./components/Login";
import { PrivateRoute } from "./components/PrivateRoute";
import { Home } from "./components/Home/";
import { CreateAccount } from "./components/CreateAccount";
import "./assets/vendor/nucleo/css/nucleo.css";
import "./assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/css/argon-dashboard-react.css";

const isAuthenticated = false;

const loginProps = { isAuthenticated };

const App: React.FC = () => {
  console.log(isAuthenticated);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" render={() => <Login {...loginProps} />}/>
        <Route path="/create-account" render={() => <CreateAccount/>}/>
        {/* Remove this fake auth prop being passed, should be retrieved by context */}
        <PrivateRoute path="/index" auth={isAuthenticated} component={Home} />
      </Switch>
      {(isAuthenticated) ? <Redirect from="/" to="index" /> : <Redirect from="/" to="login" />}
    </BrowserRouter>
  );
}

export default App;
