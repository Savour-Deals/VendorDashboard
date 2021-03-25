import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login }  from "./components/Account/Login";
import { PrivateRoute } from "./components/PrivateRoute";
import { HomeBody } from "./components/Home/HomeBody";
import { withHeader } from "./components/common/withHeader";
import { CreateAccount } from "./components/Account/CreateAccount";
import Amplify from 'aws-amplify';
import config from "./config";
import { Loading } from "./components/common/Loading";
import ResetAccount from "./components/Account/ResetAccount";
import { PATHS } from "./accessor/paths";
import { Campaigns } from "./components/Campaign"
import { useCallback } from "react";
import { getVendors } from "./accessor/BusinessUser";
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

interface IApp {
  userContext: IUserContext;
}

const loginProps = { isAuthenticated: false };

const App: React.FC<IApp> = props => {

  const { userContext } = props;

  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [vendors, setVendors] = useState<Array<Vendor>>([]);

  console.log(userContext);

  const loadVendors = useCallback(async (username: string) => {
    const { loadedVendors, error } = await getVendors(username);

    if (!error) {
      setVendors(loadedVendors);
      setLoading(false);
      setError("");
    } else {
      setLoading(false);
      setError("Failed to load your profile");
    }

  }, [setVendors, setLoading, userContext.user]);


  useEffect(() => {
    if (userContext.user) {
      setLoading(true);
      loadVendors(userContext.user.username);
    }
  }, [loadVendors]);

  const pageProps =  {
    error,
    loading,
    vendors,
    setVendors,
    setLoading,
    setError,
  };

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
            <PrivateRoute path="/index" auth={userContext.isAuthenticated} component={withHeader(HomeBody, pageProps)} />
            <PrivateRoute path="/campaigns" auth={userContext.isAuthenticated} component={withHeader(Campaigns, pageProps)} />

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
