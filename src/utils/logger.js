import React from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {WIDTH} from './plaform';

export let Debugger = {log: () => void 666};

const Button = ({children, ...others}) => {
  return (
    <TouchableOpacity {...others} style={{width: WIDTH / 4}}>
      <Text style={{textAlign: 'center'}}>{children}</Text>
    </TouchableOpacity>
  );
};

export class Logger extends React.Component {
  state = {
    loggerQueue: [],
    open: false,
  };

  getRef = node => (this.scroller = node);

  componentDidMount() {
    Debugger = this;
  }
  log(obj) {
    setTimeout(() => {
      let _obj = obj;
      if (_obj instanceof Object || _obj instanceof Array) {
        _obj = JSON.stringify(_obj, null, 2);
      }
      this.setState({
        loggerQueue: [...this.state.loggerQueue, _obj],
      });
    });
  }
  open = () => {
    this.setState({open: !this.state.open});
  };

  render() {
    if (!this.state.open) return null;
    return (
      <View
        style={{
          position: 'absolute',
          marginTop: 20,
          marginLeft: 20,
        }}>
        <ScrollView
          ref={this.getRef}
          onContentSizeChange={() => {
            this.scroller.scrollToEnd({animated: true});
          }}
          style={{
            borderWidth: 1,
            backgroundColor: 'white',
            height: 200,
            width: WIDTH / 2,
          }}>
          {this.state.loggerQueue.map((obj, index) => {
            return (
              <Text style={{fontSize: 10}} key={index}>
                {index}:{obj}
              </Text>
            );
          })}
        </ScrollView>
        <View style={{flexDirection: 'row'}}>
          <Button
            onPress={() => {
              this.setState({
                loggerQueue: [],
              });
            }}>
            清理
          </Button>
        </View>
      </View>
    );
  }
}
