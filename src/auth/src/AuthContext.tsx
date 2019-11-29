import React, { createContext } from "react";


const INITIAL_AUTH = {
  isAuthenticated: false,
  user: null
}

export const AuthContext = createContext(INITIAL_AUTH);