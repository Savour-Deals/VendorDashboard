import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';

it('renders without crashing', () => {
  const userContext: IUserContext = {
    isAuthenticated: false,
    isLoading: false,
    confirmSignUp: async (username: string, code: string) => {},
    handleLogin: async (username: string, code: string) => {},
    handleLogout: async () => {},
    handleSignUp:  async (signupData: SignUpData) => {return {} as any},
    addBusiness: async (business: any) => {},
    data: {},


  }
  const div = document.createElement('div');
  ReactDOM.render(<App userContext={userContext}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
