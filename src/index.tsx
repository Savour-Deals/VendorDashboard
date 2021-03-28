import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { UserContext, UserContextProvider } from './auth/UserContext';

ReactDOM.render(
  <>
  <UserContextProvider >
  <UserContext.Consumer>
    {(userContext: IUserContext) => <App userContext={userContext} />}
  </UserContext.Consumer>
  </UserContextProvider>

  </>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
