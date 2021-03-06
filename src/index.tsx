import React from 'react';
import ReactDOM from 'react-dom';
import './style.scss';
import * as serviceWorker from './serviceWorker';
import { AppController } from './AppController';

ReactDOM.render(
  <React.StrictMode>
    <AppController />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
