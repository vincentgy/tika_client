import React from 'react';
import {TextInput, Text, View} from 'react-native';
import PageBase from '../../components/PageBase';
import Header from '../../components/Header';
import KeyboardDetector from '../../utils/keyboard';

export default class AboutMe extends React.Component {
  render() {
    return (
      <KeyboardDetector>
        {(isShow, height) => (
          <React.Fragment>
            {isShow ? null : <Header />}
            <PageBase>
              <Text
                style={{
                  color: '#8A8A8F',
                  padding: 16,
                  fontSize: 13,
                  fontWeight: '300',
                }}>
                Write something about yourself so employers get to know you
                better.
              </Text>
              <View style={{backgroundColor: 'white', padding: 16}}>
                <Text style={{color: '#FC4C0D'}}>About me</Text>
                <TextInput multiline numberOfLines={8} style={{height: 200}} />
              </View>
            </PageBase>
          </React.Fragment>
        )}
      </KeyboardDetector>
    );
  }
}
