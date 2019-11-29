import React, { useContext } from "react";
import { Auth } from "aws-amplify";
import { CognitoUser } from "amazon-cognito-identity-js";

export const signIn = async (email: string, password: string, code?: any) => {

  const payload: any  = {
    user: null,
    error: null,
  };

  try {
    const user = await Auth.signIn(email,password);

    if (user.challengeName === "SMS_MFA" || user.challengeName === "SOFTWARE_TOKEN_MFA") {

    } else if (user.challengeName === "NEW_PASSWORD_REQUEST") {
      const { requiredAttributes } = user.challengeParam;

    } else if (user.challengeName === "MFA_SETUP") {
      Auth.setupTOTP(user);
    } else {
      payload["user"] = user;
    }
  } catch(error) {
    payload["user"] = null;
    payload["error"] = error;
  }

  console.log(payload);
  return payload;
}

