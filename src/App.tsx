import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login }  from "./components/account/Login";
import { PrivateRoute } from "./components/PrivateRoute";
import { Home } from "./components/home/Home";
import { CreateAccount } from "./components/account/CreateAccount";
import { UserContextProvider, UserContext } from "./auth/UserContext";
import Amplify from 'aws-amplify';
import config from "./config";
import { Loading } from "./components/common/Loading";
import ResetAccount from "./components/account/ResetAccount";
import { PATHS } from "./accessor/paths";

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  },
  API: {
    endpoints: Object.values(PATHS).map((path) => {
      return {
        name: path.api,
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      }
    })
  }
});

const loginProps = { isAuthenticated: false };

const App: React.FC = () => {
  return (
  <UserContextProvider >
    <UserContext.Consumer>
      {(auth: IUserContext) => 
            <BrowserRouter>
            {auth.isLoading && 
              <Loading/>
            }
            <Switch>
                <Route path="/login" render={() => <Login {...loginProps} />}/>
                <Route path="/create-account" render={() => <CreateAccount/>}/>
                <Route path="/reset-account" render={() => <ResetAccount/>}/>
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
