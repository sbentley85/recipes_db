import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';
import { Auth0Provider } from "./contexts/auth0-context";

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider>
    <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
