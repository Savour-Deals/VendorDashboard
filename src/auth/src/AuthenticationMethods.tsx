import React, { useContext } from "react";
import { Auth } from "aws-amplify";
import { CognitoUser } from "amazon-cognito-identity-js";

export const signIn = async (email: string, password: string, code?: any) => {
  try {
    const user = await Auth.signIn(email,password);

    if (user.challengeName === "SMS_MFA" || user.challengeName === "SOFTWARE_TOKEN_MFA") {

    }
  } catch(error) {

  }
}

