import React, { Component } from 'react';
import { Provider } from 'react-redux';
import getTheme from './theme/components';
import Routes from './routes/Router';
import store from './store/store'
import { StyleProvider } from 'native-base';

//using material theme for app
import material from './theme/variables/material';

export default class App extends Component {
  render() {
    return (
      <StyleProvider style={getTheme(material)} >
        <Provider store={store} >
          <Routes />
        </Provider>
      </StyleProvider>
    )
  }
}