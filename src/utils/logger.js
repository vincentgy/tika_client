import React from 'react';
import {ScrollView, Text} from 'react-native';
import {WIDTH} from './plaform';
import {Button} from 'react-native-elements';

export let Debugger = null;

export class Logger extends React.Component {
  state = {
    loggerQueue: [],
    open: true,
  };

  getRef = node => (this.scroller = node);

  componentDidMount() {
    Debugger = this;
  }
  log(obj) {
    let _obj = obj;
    if (_obj instanceof Object || _obj instanceof Array) {
      _obj = JSON.stringify(obj, undefined, 2).replace(/\\/g, '');
    }
    this.setState({
      loggerQueue: [...this.state.loggerQueue, _obj],
    });
  }

  render() {
    return (
      <ScrollView
        style={{
          borderWidth: 1,
          position: 'absolute',
          backgroundColor: 'white',
          height: this.state.open ? 200 : 20,
          width: WIDTH / 2,
        }}>
        <Button
          onPress={() => {
            this.setState({
              open: !this.state.open,
            });
          }}
          buttonStyle={{height: 20, width: 100}}
          title="关闭"
        />
        {/* <Button
          onPress={() => {
            this.setState({
              loggerQueue: [],
            });
          }}
          buttonStyle={{height: 20, width: 100}}
          title="清理"
        /> */}
        {this.state.loggerQueue.map((obj, index) => {
          return (
            <Text style={{fontSize: 10}} key={index}>
              {index}:{obj}
            </Text>
          );
        })}
      </ScrollView>
    );
  }
}
