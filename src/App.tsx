import React, { useContext, useEffect, useState } from "react";
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
import { useCallback } from "react";
import { GetBusinessUser } from "./accessor/BusinessUser";
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

interface IApp {
  userContext: IUserContext;
}

const loginProps = { isAuthenticated: false };

const App: React.FC<IApp> = props => {

  const { userContext } = props;

  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [vendors, setVendors] = useState<Array<Vendor>>([]);

  const loadVendors = useCallback(async () => {

    console.log(userContext);

    if (!userContext.user) return;

    const { loadedVendors, error } = await GetBusinessUser(userContext.user.username);

    if (!error) {
      setVendors(loadedVendors);
      setLoading(false);
      setError(undefined);
    } else {
      setLoading(false);
      setError("Failed to load your profile");
    }

  }, [setVendors, setLoading, userContext.user]);


  useEffect(() => {
    loadVendors();
  }, [loadVendors]);

  const Home = withHeader(HomeBody, {});
  const CampaignsWrapped = withHeader(Campaigns, {
    error,
    loading,
    vendors,
    setVendors,
  });

  return (
      <>
        <BrowserRouter>
        {userContext.isLoading && 
          <Loading/>
        }
        <Switch>
            <Route path="/login" render={() => <Login {...loginProps} />}/>
            <Route path="/create-account" render={() => <CreateAccount/>}/>
            <Route path="/reset-account" render={() => <ResetAccount/>}/>
            <PrivateRoute path="/index" auth={userContext.isAuthenticated} component={Home} />
            <PrivateRoute path="/campaigns" auth={userContext.isAuthenticated} component={CampaignsWrapped} />

          </Switch>
          {
            userContext.isAuthenticated
            ? <Redirect to="/index" />
            : <Redirect to="/login" />
          }
        </BrowserRouter>
    </>
  );
}

export default App;
