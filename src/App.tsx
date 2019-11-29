import React from "react";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import  { Login }  from "./components/Login";
import { PrivateRoute } from "./components/PrivateRoute";
import { Home } from "./components/Home/";
import { CreateAccount } from "./components/CreateAccount";
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import { AuthContext } from "./auth";

Amplify.configure(awsconfig);

const isAuthenticated = false;

const INITIAL_AUTH = {
  isAuthenticated: false,
  user: null
}

const loginProps = { isAuthenticated };

const App: React.FC<any> = (props) => {
  console.log(isAuthenticated);

  return (
    <AuthContext.Provider value={INITIAL_AUTH}>
      <AuthContext.Consumer>
        {props => 
          <BrowserRouter>
            <Switch>
              <Route path="/login" render={() => <Login {...loginProps} />}/>
              <Route path="/create-account" render={() => <CreateAccount/>}/>
              {/* Remove this fake auth prop being passed, should be retrieved by context */}
              <PrivateRoute path="/index" auth={isAuthenticated} component={Home} />
            </Switch>
            {(isAuthenticated) ? <Redirect from="/" to="index" /> : <Redirect from="/" to="login" />}
          </BrowserRouter>
        }
      </AuthContext.Consumer>
    </AuthContext.Provider>

  );
}

export default App;
