import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import registerServiceWorker from './registerServiceWorker';
import App from './components/App';
import { ConnectedRouter } from 'connected-react-router';
import { history } from './store/store';

ReactDOM.render(
  <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
