import React from 'react';
import {Provider} from 'react-redux';
import {createStackNavigator} from 'react-navigation';
import Rluy from './utils/rluy.native';
import PJ from './controller/postJob';
import user from './controller/user';
import filter from './controller/filter';

import {
  NativeModules,
  YellowBox,
  Alert,
  PanResponder,
  View,
  StatusBar,
} from 'react-native';
import TabRoot from './router';
import {Logger, Debugger} from './utils/logger';
import CreateAccount from './pages/Login/create';
import Login from './pages/Login';
import {connect} from 'react-redux';
import {start} from './utils/update';

// StatusBar.setBarStyle('light-content', true);

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader',
  'Class RCTCxxModule',
  'Module ZipPlugin',
  'Module CDVFileTransfer',
]);

Rluy.addController(PJ);
Rluy.addController(filter);
Rluy.addController(user);

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

@connect(state => {
  return {isLogin: state.user.isLogin};
})
class App extends React.Component {
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

  componentDidMount() {
    this.props.dispatch({type: 'checkLogin'});

    // ImagePicker.openPicker({
    //   width: 300,
    //   height: 400,
    //   cropping: true,
    // }).then(image => {
    //   console.log(image);
    //   let formData = new FormData();
    //   let file = {uri: image.path, type: image.mime, name: image.filename};
    //   formData.append(file);
    //   fetch('http://18.222.175.208/upload.php?token=xxx&c=u&id=3', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //     body: formData,
    //   }).then(responseData => {
    //     responseData.json().then(res => {
    //       console.log(res);
    //     });
    //   });
    // });
  }

  render() {
    if (this.props.isLogin === 'init-login-props') return null;
    if (!this.props.isLogin) return <LoginStack loginDone={this.LoginDone} />;

    return (
      <React.Fragment>
        <StatusBar barStyle="light-content" />
        <TabRoot />
        <Logger />
      </React.Fragment>
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
  <Provider store={store}>
    <DevMenuTrigger>
      <App />
    </DevMenuTrigger>
  </Provider>
);
