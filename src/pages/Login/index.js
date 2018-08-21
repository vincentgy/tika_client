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
import {Loading} from '../../components/Loading';

const Center = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
`;

export default class Login extends React.Component {
  state = {
    loading: false,
  };

  async handleLogin(obj) {
    try {
      const {Email, Password} = obj;

      this.setState({
        loading: true,
      });
      const res = await Post({
        a: 'ul',
        e: Email,
        p: Password,
      });
      this.setState({
        loading: false,
      });

      if (res.ret !== 0) {
        Alert.alert('Please enter a correct email or password');
      } else {
        this.props.loginDone();
      }
    } catch (e) {
      Alert.alert('Our server just got some issues');
      this.setState({
        loading: false,
      });
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
              <View style={{height: '50%'}} />
              <View style={{height: '50%', backgroundColor: 'white'}}>
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
                      {this.state.loading ? (
                        <Loading />
                      ) : (
                        <Button
                          buttonStyle={{height: 48, marginTop: 16}}
                          backgroundColor="#0077FF"
                          borderRadius={4}
                          onPress={onSumit}
                          title="Log in"
                        />
                      )}
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
                        <Text style={{color: Theme}}>Create an account</Text>
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