import { createContext, useState, useEffect } from "react";
import { Auth } from "aws-amplify";

const INITIAL_AUTH: any = {
  auth: false,
  user: null,
  loading: false,
  setAuth: (updatedAuth: boolean) => {},
  setUser: (updatedUser: object) => {},
  signIn: (email: string, password: string) => {},
}

export interface IAuthContext {
  auth: boolean;
  user: any;
  loading: boolean;
  setAuth: (updatedAuth: boolean) => void;
  setUser: (updatedUser: object) => void;
  signIn: (email: string, password: string) => void;
}

export const AuthContext = createContext<IAuthContext>(INITIAL_AUTH);

export const useAuth = (): IAuthContext => {

  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function getInitialData() {
    
    try {
      const currentAuthenticatedUser = await Auth.currentAuthenticatedUser();
      setUser(currentAuthenticatedUser);
      setAuth(true);

      console.log(currentAuthenticatedUser);
    } catch (error) {
      console.log("No Current User");
    }

  }

  if (!auth) getInitialData();

  async function signIn(email: string, password: string) {
      try {
        const user = await Auth.signIn(email,password);
        console.log(user);
        if (user.challengeName === "SMS_MFA" || user.challengeName === "SOFTWARE_TOKEN_MFA") {
          console.log("SMS_MFA or SOFTWARE_TOKEN_MFA")
        } else if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
          const { requiredAttributes } = user.challengeParam;
          console.log(requiredAttributes);
        } else if (user.challengeName === "MFA_SETUP") {
          Auth.setupTOTP(user);
        } else {
          setUser(user);
        }
      } catch(error) {
        console.log(error);
        alert(`Sorry! ${error.message}`);
      }

  }

  return {
    auth,
    user,
    loading,
    setAuth,
    setUser,
    signIn
  }
}