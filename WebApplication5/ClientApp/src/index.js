import './polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import { store } from './_helpers'
import { App } from './App';
// disable ServiceWorker
import registerServiceWorker from './registerServiceWorker';

//import { configureFakeBackend } from './_helpers';

//configureFakeBackend();


ReactDOM.render(   <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));
// disable ServiceWorker
registerServiceWorker();
