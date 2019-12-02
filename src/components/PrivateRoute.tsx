import React from "react";
import { Route, Redirect } from "react-router-dom";

interface PrivateRouteProps {
  component: React.FC<any>;
  auth: boolean;
  path: string;
  componentProps: object;
};

export const PrivateRoute: React.FC<PrivateRouteProps> = (props) => {
  const { component: Component, path, auth, componentProps } = props;
  return (
    <Route path={path} render={(props) => (
        (auth) 
        ? <Component {...componentProps}/> 
        : <Redirect to="/login"/>
      )}
    />
  );
}