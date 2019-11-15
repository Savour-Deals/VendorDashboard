import React from "react";
import { Route, Redirect } from "react-router-dom";

interface PrivateRouteProps {
  component: React.FC<any>;
  auth: boolean;
  path: string;
};

export const PrivateRoute: React.FC<PrivateRouteProps> = (props) => {
  const { component: Component, path, auth } = props;
  return (
    <Route path={path} render={(props) => (
        (auth) 
        ? <Component {...props}/> 
        : <Redirect to="/login"/>
      )}
    />
  );
}