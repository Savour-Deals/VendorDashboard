import React, { createContext, useReducer } from "react";


const INITIAL_AUTH: any = {
  isAuthenticated: false,
  user: null
}

export const reducer = (state: any, action: any) => {
  switch(action.type) {
    case 'updateAuth':
      return {
        ...state,
        value: action.payload
      }
    default:
      return state
  }
}

export const AuthContext = createContext(INITIAL_AUTH);

export const AuthContextProvider = ({auth, ...props}: any) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_AUTH);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        handleSubscribe: () => {
        }
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}     