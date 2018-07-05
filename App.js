import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Provider} from 'react-redux';
import Rluy from './src/rluy.native';
import user from './src/controller/user';

Rluy.addController(user);
const store = Rluy.run();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{backgroundColor: '#2D59D9', height: '100%'}} />
      </Provider>
    );
  }
}
