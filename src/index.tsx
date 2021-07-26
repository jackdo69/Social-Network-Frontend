import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

import theme from './themes';
import App from './components/App';
import { LayoutProvider } from './context/LayoutContext';

//redux
import { Provider } from 'react-redux';
import store from './store/index';

ReactDOM.render(
  <Provider store={store}>
    <LayoutProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </LayoutProvider>
  </Provider>,
  document.getElementById('root'),
);
