import React from 'react';
import {TextInput, Text, View} from 'react-native';
import PageBase from '../../components/PageBase';
import Header from '../../components/Header';
import KeyboardDetector from '../../utils/keyboard';
import {Put, Auto} from '../../store';
import {EasyTap} from '../../public/EasyTap';
import {Entypo, MaterialIcons} from '../../components/Icons';

const AboutMeText = Auto(s => s.profile.aboutMe);
const WORD_LIMITS = 600;

export default class AboutMe extends React.Component {
  onTextChange = text => {
    Put(state => {
      state.profile.aboutMe = text;
    });
  };

  render() {
    return (
      <KeyboardDetector>
        {(isShow, height) => (
          <React.Fragment>
            {isShow ? null : (
              <Header
                title={<Text style={{color: 'white'}}>About Me</Text>}
                leftButton={[
                  <EasyTap
                    key={1}
                    onPress={() => this.props.navigation.goBack()}>
                    <Entypo
                      size={16}
                      color="white"
                      key={0}
                      name="chevron-thin-left"
                    />
                  </EasyTap>,
                ]}
                rightButton={[
                  <EasyTap
                    key={1}
                    onPress={() => this.props.navigation.goBack()}>
                    <MaterialIcons
                      size={20}
                      color="white"
                      key={0}
                      name="check"
                    />
                  </EasyTap>,
                ]}
              />
            )}
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
              <View
                style={{
                  backgroundColor: 'white',
                  paddingHorizontal: 16,
                  paddingTop: 8,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{color: '#FC4C0D'}}>About me</Text>
                  {AboutMeText(text => (
                    <Text style={{color: '#FC4C0D'}}>
                      {text.length}/{WORD_LIMITS}
                    </Text>
                  ))}
                </View>
                {AboutMeText(text => (
                  <TextInput
                    onChangeText={this.onTextChange}
                    value={text}
                    multiline
                    numberOfLines={8}
                    style={{height: 200}}
                  />
                ))}
              </View>
            </PageBase>
          </React.Fragment>
        )}
      </KeyboardDetector>
    );
  }
}
