import React, { useState, useEffect } from "react";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import  { Login }  from "./components/Login";
import { PrivateRoute } from "./components/PrivateRoute";
import { Home } from "./components/Home/";
import { CreateAccount } from "./components/CreateAccount";

import { AuthContext, useAuth } from "./auth";


const loginProps = { isAuthenticated: false };



const App: React.FC =  () => {

  const auth = useAuth();
  const homeProps = {
    auth: auth.auth
  }
  if (auth.loading) return <h1>Loading...</h1>;
  console.log(auth);

  return (
  <AuthContext.Provider value={auth}>
      <BrowserRouter>
      <Switch>
          <Route path="/login" render={() => <Login {...loginProps} />}/>
          <Route path="/create-account" render={() => <CreateAccount/>}/>
          {/* Remove this fake auth prop being passed, should be retrieved by context */}
          <PrivateRoute path="/index" auth={auth.auth} component={Home} componentProps={homeProps} />
        </Switch>
        {(auth.auth) ? <Redirect to="/index" /> : <Redirect to="/login" />}
      </BrowserRouter>
    </AuthContext.Provider>

  );
}

export default App;
