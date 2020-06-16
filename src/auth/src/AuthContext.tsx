import React, { createContext, useReducer } from "react";
import { Auth, API } from "aws-amplify";
import { CognitoUser, UserData } from "amazon-cognito-identity-js";

const INITIAL_AUTH: IAuthContext = {
  isAuthenticated: false,
  user: null,
  handleLogin: (email: string, password: string) => {},
  handleSignUp: (signupData: SignUpData) => new Promise(res => ({
    user: null,
    isAuthenticated: false
  })),
  handleLogout: () => {}
}

export const AuthContext = createContext<IAuthContext>(INITIAL_AUTH);

function reducer(state: IAuthContext, action: any) {
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

  async function handleSignUp(signupData: SignUpData): Promise<IUserAuth> {
    try {
      const { email, password, firstName, lastName, phoneNumber } = signupData;
      const signupResult = await Auth.signUp({ username: email, password, attributes: { email }});

      const user = signupResult.user;

      // creating the DynamoDB user 

      try {
        const userName = signupResult.userSub;

        await API.post("business_users", "/business_users", 
        { 
          body: {
            uid: userName,
            email,
            first_name: firstName,
            mobile_number: phoneNumber,
            last_name: lastName,
            businesses: []
          }
        }
        );
      } catch (error) {
        console.log(error);
        alert(`Error, could not create user. ${error.message}`);
      }
      
      return {
        user,
        isAuthenticated: true
      };
    } catch (error) {
      console.log(error);
      alert(`Sorry! ${error.message}`);
    }  
    return {
      user: null,
      isAuthenticated: false
    }
  }
  
  async function handleAuthentication() {
    const payload = {
      user: null,
      isAuthenticated: false,
    };
    try {
      const user = await Auth.currentAuthenticatedUser();
      payload["user"] = user;
      payload["isAuthenticated"] = true;
      console.log(user);
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
      console.log(error)
      alert(`Sorry! ${error.message}`);
    }
  }

  async function handleLogin(email: string, password: string) {
  
    const payload = {
      user: null,
      isAuthenticated: false,
    };
    debugger;
    try {
      const authenticatedUser = await Auth.signIn(email,password);
      if (authenticatedUser.challengeName === "SMS_MFA" || authenticatedUser.challengeName === "SOFTWARE_TOKEN_MFA") {
        console.log("SMS_MFA or SOFTWARE_TOKEN_MFA")
      } else if (authenticatedUser.challengeName === "NEW_PASSWORD_REQUIRED") {
    
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
    handleLogout: handleLogout,
    handleSignUp: handleSignUp
  }}>
    {props.children}
  </AuthContext.Provider>
}
