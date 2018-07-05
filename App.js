import React from 'react';
import {StyleSheet, Text, View, TextInput, Alert, Button} from 'react-native';
import {Provider} from 'react-redux';
import * as Animatable from 'react-native-animatable';
import Rluy from './src/utils/rluy.native';
import user from './src/controller/user';
import {Form} from './src/components/Form';
import {WIDTH} from './src/utils/plaform';

Rluy.addController(user);
const store = Rluy.run();

class Input extends React.Component {
  state = {
    filled: false,
  };

  handleTextRef = ref => (this.text = ref);

  static defaultProps = {
    name: 'name',
  };

  handleChangeText = text => {
    this.props.onChangeText && this.props.onChangeText(text);
    if (text.length > 0) {
      this.setState({
        filled: true,
      });
    } else {
      this.setState({
        filled: false,
      });
    }
  };

  render() {
    return (
      <View style={{backgroundColor: 'white', width: WIDTH}}>
        <Animatable.Text
          ref={this.handleTextRef}
          style={{
            position: 'absolute',
            marginTop: 17,
            color: '#a0b0a0',
            fontWeight: '100',
          }}
          iterationCount={1}
          direction="normal">
          Name
        </Animatable.Text>
        <TextInput
          style={{height: 51, fontSize: 15}}
          onChangeText={this.handleChangeText}
          returnKeyType="done"
          onBlur={() => {
            !this.state.filled &&
              this.text.transition(
                {marginTop: 0, fontSize: 10},
                {marginTop: 17, fontSize: 15}
              );
          }}
          onFocus={() => {
            !this.state.filled &&
              this.text.transition(
                {marginTop: 17, fontSize: 15},
                {marginTop: 0, fontSize: 10}
              );
          }}
        />
      </View>
    );
  }
}

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View
          style={{
            backgroundColor: '#2D59D9',
            height: '100%',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Form
            onSumit={obj => {
              Alert.alert('title', JSON.stringify(obj));
            }}>
            {(onChange, onSumit) => (
              <React.Fragment>
                <Input onChangeText={t => onChange({key: 'name', value: t})} />
                <Button onPress={onSumit} title="完成" />
              </React.Fragment>
            )}
          </Form>
        </View>
      </Provider>
    );
  }
}
