import React, { useState, useEffect, createContext, useReducer } from "react";
import { Auth } from "aws-amplify";
import Amplify from 'aws-amplify';
import awsconfig from '../../aws-exports';

Amplify.configure(awsconfig);

export const AuthContext = createContext(null);

const INITIAL_AUTH: any = {
  isAuthenticated: false,
  user: null,
  handleLogin: (email: string, password: string) => {},
  handleLogout: () => {}
}


function reducer(state: any, action: any) {
  switch(action.type) {
    case "loginUser":
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: action.payload.isAuthenticated,
      }
    default:
      return state;
  }
}  


export const AuthContextProvider = (props: any) => {

  const [state, dispatch] = useReducer(reducer, INITIAL_AUTH);


  
  async function handleAuthentication() {
    const payload = {
      user: null,
      isAuthenticated: false,
    };
    try {
      const user = await Auth.currentAuthenticatedUser();
      payload["user"] = user;
      payload["isAuthenticated"] = true;
    } catch (error) {
      console.log(`No Currently authenticated user`);
    }
  
    return payload;
  }
  
  async function handleLogout() {
    try {
      await Auth.signOut();
      dispatch({
        type: "logoutUser",
        payload: {}
      });
    } catch (error) {
      alert(`Sorry! ${error.message}`);
    }
  }

  async function handleLogin(email: string, password: string) {
  
    const payload = {
      user: null,
      isAuthenticated: false,
    };
  
    try {
      const authenticatedUser = await Auth.signIn(email,password);
      if (authenticatedUser.challengeName === "SMS_MFA" || authenticatedUser.challengeName === "SOFTWARE_TOKEN_MFA") {
        console.log("SMS_MFA or SOFTWARE_TOKEN_MFA")
      } else if (authenticatedUser.challengeName === "NEW_PASSWORD_REQUIRED") {
        const { requiredAttributes } = authenticatedUser.challengeParam;
      } else if (authenticatedUser.challengeName === "MFA_SETUP") {
        Auth.setupTOTP(authenticatedUser);
      } else {
        payload["user"] = authenticatedUser;
        payload["isAuthenticated"] = true;
        dispatch({
          type: "loginUser",
          payload
        }); 
  
      }
    } catch (error) {
      alert(`Sorry! ${error.message}`);
    }
  
 
  }

  

  if (!state.isAuthenticated) {
    handleAuthentication().then(payload => {

      if (payload.isAuthenticated) {
        dispatch({
          type: "loginUser",
          payload
        });
      }
  });
}

  return <AuthContext.Provider value={{
    ...state,
    handleLogin: handleLogin,
    handleLogout: handleLogout
  }}>
    {props.children}
  </AuthContext.Provider>
}
