import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login }  from "./components/Account/Login";
import { PrivateRoute } from "./components/PrivateRoute";
import { HomeBody } from "./components/Home/HomeBody";
import { withHeader } from "./components/common/withHeader";
import { CreateAccount } from "./components/Account/CreateAccount";
import { UserContextProvider, UserContext } from "./auth/UserContext";
import Amplify from 'aws-amplify';
import config from "./config";
import { Loading } from "./components/common/Loading";
import ResetAccount from "./components/Account/ResetAccount";
import { PATHS } from "./accessor/paths";
import { Campaigns } from "./components/Campaign"
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
        name: PATHS.BUSINESS.api,
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      },
      {
        name: PATHS.BUSINESS_USER.api,
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      },
      {
        name: PATHS.MESSAGE.api,
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      },
    ]
  }
});

const loginProps = { isAuthenticated: false };

const App: React.FC = () => {
  const Home = withHeader(HomeBody);
  const CampaignsWrapped = withHeader(Campaigns);
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
                <PrivateRoute path="/campaigns" auth={auth.isAuthenticated} component={CampaignsWrapped} />

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
