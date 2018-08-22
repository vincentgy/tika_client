import React from 'react';
import {Provider} from 'react-redux';
import {createStackNavigator} from 'react-navigation';
import Rluy from './utils/rluy.native';
import user from './controller/user';

import {
  NativeModules,
  YellowBox,
  Alert,
  PanResponder,
  View,
  StatusBar,
  AsyncStorage,
} from 'react-native';

import TabRoot from './router';
import filter from './controller/filter';
import {Logger, Debugger} from './utils/logger';
import CreateAccount from './pages/Login/create';
import Login from './pages/Login';

// StatusBar.setBarStyle('light-content', true);

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader',
  'Class RCTCxxModule',
]);

Rluy.addController(user);
Rluy.addController(filter);

const store = Rluy.run();
const alert = Alert.alert;

const withoutHeader = page => {
  return {
    screen: page,
    navigationOptions: {
      header: null,
    },
  };
};

const LoginStack = createStackNavigator({
  Login: withoutHeader(Login),
  CreateAccount: withoutHeader(CreateAccount),
});

class App extends React.Component {
  state = {
    isLogin: false,
  };

  getViewContainerRef = node => (this.View = node);

  async checkVersion() {
    const res = await fetch('http://192.168.1.5:3000/api/check');
    const json = await res.json();
    alert('检测到服务器版本', `version:${json.version},build:${json.build}`);
    if (NativeModules.hotupdate) {
      NativeModules.hotupdate
        .download('http://192.168.1.5:8080/hello', 'json')
        .then(e => {
          console.log(e.result);
          alert('下载成功：' + e.result + '，下次重启时生效！');
        })
        .catch(error => console.log(error));
    }
  }

  async checkLogin() {
    const token = await AsyncStorage.getItem('token');
    if (token !== null) {
      this.setState({isLogin: true});
    }
  }

  LoginDone = () => {
    this.checkLogin();
  };

  componentDidMount() {
    this.checkLogin();
    // this.checkVersion();
  }

  render() {
    if (!this.state.isLogin)
      return <LoginStack screenProps={{LoginDone: this.LoginDone}} />;

    return (
      <Provider store={store}>
        <React.Fragment>
          <StatusBar barStyle="light-content" />
          <TabRoot />
          <Logger />
        </React.Fragment>
      </Provider>
    );
  }
}

// https://github.com/facebook/react-native/issues/10191
// 3 finger touch can get the things out
const DevMenuTrigger = ({children}) => {
  const {DevMenu} = NativeModules;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => {
      if (gestureState.numberActiveTouches === 3) {
        DevMenu.show();
      }
      if (gestureState.numberActiveTouches === 2) {
        Debugger.open();
      }
    },
  });
  return (
    <View style={{flex: 1}} {...panResponder.panHandlers}>
      {children}
    </View>
  );
};

export default () => (
  <DevMenuTrigger>
    <App />
  </DevMenuTrigger>
);
