import { createContext, useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import Amplify from 'aws-amplify';
import awsconfig from '../../aws-exports';

Amplify.configure(awsconfig);

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
  signOut: () => void;
}

export const AuthContext = createContext<IAuthContext>(INITIAL_AUTH);

export const useAuth = (): IAuthContext => {

  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      const checkIfSignedIn = async () => {
        try {
          const possibleUser = await Auth.currentAuthenticatedUser();
          console.log(possibleUser);
          if (possibleUser !== null) {
            setUser(possibleUser);
            setAuth(true);

            console.log(user);
            console.log(auth);
          }
        } catch (error) {

        }
      };

      checkIfSignedIn();

  }, []);

  // if (!auth) getInitialData();

  async function signIn(email: string, password: string) {
      debugger;
      try {
        const authenticatedUser = await Auth.signIn(email,password);
        if (authenticatedUser.challengeName === "SMS_MFA" || authenticatedUser.challengeName === "SOFTWARE_TOKEN_MFA") {
          console.log("SMS_MFA or SOFTWARE_TOKEN_MFA")
        } else if (authenticatedUser.challengeName === "NEW_PASSWORD_REQUIRED") {
          const { requiredAttributes } = authenticatedUser.challengeParam;
        } else if (authenticatedUser.challengeName === "MFA_SETUP") {
          Auth.setupTOTP(authenticatedUser);
        } else {

          setUser(user);
          setAuth(true);

        }
      } catch(error) {
        console.log(error);
        alert(`Sorry! ${error.message}`);
      }

  }

  function signOut() {
    Auth.signOut()
    .then(data => console.log(data))
    .catch(err => console.log(err));
    setAuth(false);
    setUser(null);
    console.log(auth);

  }

  return {
    auth,
    user,
    loading,
    setAuth,
    setUser,
    signIn,
    signOut
  }
}