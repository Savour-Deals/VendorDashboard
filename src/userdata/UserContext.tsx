import React, { createContext, useReducer } from "react";

const INITIAL_USER: IUserContext = {

};

export const UserContext = createContext(INITIAL_USER);

function reducer(state: IUserContext, action: any) {
  switch (action.type) {
    default:
      return state;
  }
}

export const UserContextProvider = (props: any) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_USER);

}