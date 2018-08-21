import React from 'react';
import {ScrollView, View, Alert, Text} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Form from '../../components/Form';
import Input from '../../components/Input';
import KeyboardDetector from '../../utils/keyboard';
import {Button} from 'react-native-elements';
import styled from 'styled-components';
import {Theme} from '../../utils/color';

const Center = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
`;

export default class CreateAccount extends React.Component {
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
                      <Center>
                        <Text style={{fontSize: 12, marginTop: 8}}>
                          By signing up you agree to our terms and condition
                        </Text>
                      </Center>
                      <Button
                        buttonStyle={{height: 48, marginTop: 16}}
                        backgroundColor="#0077FF"
                        borderRadius={4}
                        onPress={onSumit}
                        title="Sign up"
                      />
                      <Center
                        style={{marginTop: 16}}
                        onPress={() => {
                          this.props.navigation.goBack();
                        }}>
                        <Text style={{color: Theme}}>
                          Or log in existing account
                        </Text>
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
