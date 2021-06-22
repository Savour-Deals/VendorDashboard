import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login }  from "./components/account/Login";
import { PrivateRoute } from "./components/PrivateRoute";
import { HomeBody } from "./components/home/HomeBody";
import { withHeader } from "./components/common/withHeader";
import { CreateAccount } from "./components/account/CreateAccount";
import Amplify from 'aws-amplify';
import config from "./config";
import { Loading } from "./components/common/Loading";
import ResetAccount from "./components/account/ResetAccount";
import { PATHS } from "./accessor/paths";
import { useCallback } from "react";
import { GetBusinessUser } from "./accessor/BusinessUser";
import Business from "./model/business";
import { GetBusinesses } from "./accessor/Business";
import BusinessUser from "./model/businessUser";
import { CampaignPage } from "./components/campaign/CampaignPage";
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
  const [businesses, setBusinesses] = useState<Array<Business>>([]);
  const [businessUser, setBusinessUser] = useState<BusinessUser>();
  console.log(userContext);

  const loadData = useCallback(async (username: string) => {
    const { businessUser, error } = await GetBusinessUser(username);
    if (error) {
      setLoading(false);
      setError("Failed to load your profile");
    }
    setBusinessUser(businessUser);
    const { businesses, errors } = await GetBusinesses(businessUser.businesses);

    if (errors.length === 0) {
      setBusinesses(businesses);
      setLoading(false);
      setError("");
    } else {
      setLoading(false);
      setError("Failed to load your profile");
    }
  }, [setBusinesses, setLoading]);


  useEffect(() => {
    if (userContext.user) {
      setLoading(true);
      loadData(userContext.user.username);
    }
  }, [loadData, userContext.user]);

  const pageProps =  {
    error,
    loading,
    businessUser,
    businesses,
    setBusinessUser,
    setBusinesses,
    setLoading,
    setError,
  };

  return (
    <>
      <BrowserRouter>
        {userContext.isLoading && 
          <Loading/>
        }
        {!userContext.isLoading && 
          <>
            {!userContext.isAuthenticated && 
              <Switch>
                <Route path="/login" render={() => <Login {...loginProps} />}/>
                <Route path="/create-account" render={() => <CreateAccount/>}/>
                <Route path="/reset-account" render={() => <ResetAccount/>}/>
                <Route path="/*">
                    <Redirect to="/login" />
                </Route>
              </Switch>
            }
            {userContext.isAuthenticated && 
              <Switch>
                <PrivateRoute path="/home" auth={userContext.isAuthenticated} component={withHeader(HomeBody, pageProps)} />
                <PrivateRoute path="/campaigns" auth={userContext.isAuthenticated} component={withHeader(CampaignPage, pageProps)} />
                <Route path="/*">
                    <Redirect to="/home" />
                </Route>
              </Switch>
            }
          </>
        }
      </BrowserRouter>
    </>
  );
}

export default App;
