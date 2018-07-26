import React from 'react';
import {Provider} from 'react-redux';

import Rluy from './utils/rluy.native';
import user from './controller/user';

import {NativeModules, YellowBox, Alert} from 'react-native';
YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader',
]);

import TabRoot from './router';

Rluy.addController(user);
const store = Rluy.run();
const alert = Alert.alert;

export default class App extends React.Component {
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
    // this.checkVersion();
  }

  render() {
    return (
      <Provider store={store}>
        <TabRoot />
      </Provider>
    );
  }
}