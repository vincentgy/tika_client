import React from 'react';
import {ScrollView, View, Alert, Text} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Form from '../../components/Form';
import Input from '../../components/Input';
import KeyboardDetector from '../../utils/keyboard';
import {Button} from 'react-native-elements';
import styled from 'styled-components';
import {Theme} from '../../utils/color';
import {Post} from '../../utils/url';

const Center = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
`;

export default class Login extends React.Component {
  async handleLogin(obj) {
    const {Email, Password} = obj;

    const res = await Post({
      a: 'ul',
      e: Email,
      p: Password,
    });

    if (res.ret !== 0) {
      console.log(res);

      Alert.alert('Please enter a correct email or password');
    }
  }

  render() {
    return (
      <KeyboardDetector>
        {(isShow, height, getViewContainerRef) => (
          <ScrollView
            contentContainerStyle={{
              backgroundColor: '#2D59D9',
              height: '100%',
            }}>
            <Animatable.View ref={getViewContainerRef}>
              <View style={{height: '30%'}} />
              <View style={{height: '70%', backgroundColor: 'white'}}>
                <Form
                  onSumit={obj => {
                    this.handleLogin(obj);
                  }}>
                  {(onChange, onSumit) => (
                    <React.Fragment>
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
                        title="Log in"
                      />
                      <Center style={{marginTop: 16}}>
                        <Text style={{color: Theme}}>
                          Forgot your password?
                        </Text>
                      </Center>
                      <Center
                        style={{marginTop: 16}}
                        onPress={() => {
                          this.props.navigation.navigate('CreateAccount');
                        }}>
                        <Text style={{color: Theme}}>Create an account?</Text>
                      </Center>
                    </React.Fragment>
                  )}
                </Form>
              </View>
            </Animatable.View>
          </ScrollView>
        )}
      </KeyboardDetector>
    );
  }
}
