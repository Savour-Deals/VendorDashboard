import React, { useState, useEffect } from "react";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import  { Login }  from "./components/Login";
import { PrivateRoute } from "./components/PrivateRoute";
import { Home } from "./components/Home/";
import { CreateAccount } from "./components/CreateAccount";

import { AuthContextProvider, AuthContext} from "./auth";


const loginProps = { isAuthenticated: false };



const App: React.FC =  () => {

  const homeProps = {};

  return (
  <AuthContextProvider >
    <AuthContext.Consumer>
      {(auth: any) => 
            <BrowserRouter>
            {console.log(auth)}
            <Switch>
                <Route path="/login" render={() => <Login {...loginProps} />}/>
                <Route path="/create-account" render={() => <CreateAccount/>}/>
                {/* Remove this fake auth prop being passed, should be retrieved by context */}
                <PrivateRoute path="/index" auth={auth.isAuthenticated} component={Home} componentProps={homeProps} />
              </Switch>
              {(auth.isAuthenticated) ? <Redirect to="/index" /> : <Redirect to="/login" />}
            </BrowserRouter>
      }
    </AuthContext.Consumer>
    </AuthContextProvider>

  );
}

export default App;
