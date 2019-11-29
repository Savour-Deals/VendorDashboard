import React, { useState, useEffect } from "react";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import  { Login }  from "./components/Login";
import { PrivateRoute } from "./components/PrivateRoute";
import { Home } from "./components/Home/";
import { CreateAccount } from "./components/CreateAccount";
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import { AuthContext, useAuth } from "./auth";

Amplify.configure(awsconfig);

const loginProps = { isAuthenticated: false };

const App: React.FC<any> =  (props) => {

  const auth = useAuth();
  // const { authentication, updateAuthentication } = useContext(AuthContext);

  // console.log(authentication);

  if (auth.loading) return <h1>Loading...</h1>;
  
  return (
  <AuthContext.Provider value={auth}>
      <BrowserRouter>
      <Switch>
          <Route path="/login" render={() => <Login {...loginProps} />}/>
          <Route path="/create-account" render={() => <CreateAccount/>}/>
          {/* Remove this fake auth prop being passed, should be retrieved by context */}
          <PrivateRoute path="/index" auth={auth.auth} component={Home} />
        </Switch>
        {(auth.auth) ? <Redirect from="/" to="index" /> : <Redirect from="/" to="login" />}
      </BrowserRouter>
    </AuthContext.Provider>

  );
}

export default App;
