import React from 'react';
import {View, ScrollView, Alert, Button} from 'react-native';
import {Provider} from 'react-redux';

import Rluy from './src/utils/rluy.native';
import user from './src/controller/user';
import {Form} from './src/components/Form';
import Input from './src/components/Input';

Rluy.addController(user);
const store = Rluy.run();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ScrollView
          contentContainerStyle={{
            backgroundColor: '#2D59D9',
            height: '100%',
          }}>
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
                    onChangeText={t => onChange({key: 'Password', value: t})}
                  />
                  <Button onPress={onSumit} title="完成" />
                </React.Fragment>
              )}
            </Form>
          </View>
        </ScrollView>
      </Provider>
    );
  }
}
