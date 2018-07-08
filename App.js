import React from 'react';
import {View, ScrollView, Alert} from 'react-native';
import {Provider} from 'react-redux';
import {Button} from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

import Rluy from './src/utils/rluy.native';
import user from './src/controller/user';
import {Form} from './src/components/Form';
import Input from './src/components/Input';
import KeyboardDetector from './src/utils/keyboard';

Rluy.addController(user);
const store = Rluy.run();

let didMove = false;
export default class App extends React.Component {
  getViewContainerRef = node => (this.View = node);

  componentDidMount() {
    setInterval(() => {
      fetch('http://18.222.175.208/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          a: 'ur',
          e: '215566435@qq.com',
          p: 'metal_gear2',
        }),
      }).then(res => {
        console.log(res);
        res.json().then(json => {
          console.log(json);
        });
      });
    }, 5000);
  }

  render() {
    return (
      <Provider store={store}>
        <KeyboardDetector>
          {(isShow, height, getViewContainerRef) => (
            <ScrollView
              contentContainerStyle={{
                backgroundColor: '#2D59D9',
                height: '100%',
              }}>
              <Animatable.View ref={getViewContainerRef}>
                <View style={{height: '50%'}} />
                <View style={{height: '50%', backgroundColor: 'white'}}>
                  <Form
                    onSumit={obj => {
                      Alert.alert('title', JSON.stringify(obj));
                    }}>
                    {(onChange, onSumit) => (
                      <React.Fragment>
                        <Input
                          placeholder="Name"
                          onChangeText={t => onChange({key: 'Name', value: t})}
                        />
                        <Input
                          placeholder="Email"
                          onChangeText={t => onChange({key: 'Email', value: t})}
                        />
                        <Input
                          placeholder="Password"
                          onChangeText={t =>
                            onChange({key: 'Password', value: t})
                          }
                        />
                        <Button
                          buttonStyle={{height: 48, marginTop: 16}}
                          backgroundColor="#0077FF"
                          borderRadius={4}
                          onPress={onSumit}
                          title="Sign up"
                        />
                      </React.Fragment>
                    )}
                  </Form>
                </View>
              </Animatable.View>
              )}
            </ScrollView>
          )}
        </KeyboardDetector>
      </Provider>
    );
  }
}
