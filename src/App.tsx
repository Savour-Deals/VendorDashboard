import React from "react";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login }  from "./components/Login";
import { PrivateRoute } from "./components/PrivateRoute";
import { Home } from "./components/Home/";
import { CreateAccount } from "./components/CreateAccount";
import { UserContextProvider, UserContext } from "./auth";
import Amplify from 'aws-amplify';
import config from "./config";
import { LoadingDialog } from "./components/Home/src/LoadingDialog";

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  },
  API: {
    endpoints: [
      {
        name: "business_users",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      },
      {
        name: "unclaimed_buttons",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      },
      {
        name: "businesses",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      },
      {
        name: "message_service",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      },
    ]
  }
});

const loginProps = { isAuthenticated: false };

const App: React.FC = () => {
  return (
  <UserContextProvider >
    <UserContext.Consumer>
      {(auth: IUserContext) => 
            <BrowserRouter>
            <LoadingDialog isLoading={auth.isLoading}/>

            <Switch>
                <Route path="/login" render={() => <Login {...loginProps} />}/>
                <Route path="/create-account" render={() => <CreateAccount/>}/>
                <PrivateRoute path="/index" auth={auth.isAuthenticated} component={Home} />
              </Switch>
              {
                auth.isAuthenticated
                ? <Redirect to="/index" />
                : <Redirect to="/login" />
              }
            </BrowserRouter>
      }
      </UserContext.Consumer>
    </UserContextProvider>
  );
}

export default App;
