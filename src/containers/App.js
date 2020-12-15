import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from 'store/store';

import { MuiThemeProvider } from '@material-ui/core/styles';
import defaultTheme from './Themes/default';

import IntlProvider from './IntlProvider/IntlProvider';
import { Route, Switch } from 'react-router';
import MainApp from 'components/MainApp/MainApp';

export class App extends Component {
  render() {
    return (
      <Provider store={configureStore}>
        <MuiThemeProvider theme={defaultTheme}>
          <IntlProvider locale={{ code: 'en' }}>
            <Switch>
              <Route path="/app" component={MainApp} />
              <Route component={MainApp} />
            </Switch>
          </IntlProvider>
        </MuiThemeProvider>
      </Provider>
    );
  }
}
export default App;
