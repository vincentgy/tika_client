import React from 'react';
import {View, TouchableOpacity, Text, TextInput, Platform} from 'react-native';
import Header from '../../components/Header';
import {Kohana} from 'react-native-textinput-effects';

import {NextBottom} from './nextButton';
import {Auto, Put, getStore} from '../../store';
import {FontAwesome, Entypo} from '../../components/Icons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Stepper} from '../../components/Stepper';
import {EasyTap} from '../../public/EasyTap';
import {Title} from './title';
import DropdownAlert from 'react-native-dropdownalert';

class LLTextInput extends React.Component {
  shouldComponentUpdate(nextProps) {
    return (
      Platform.OS !== 'ios' ||
      (this.props.value === nextProps.value &&
        (nextProps.defaultValue == undefined ||
          nextProps.defaultValue == '')) ||
      (this.props.defaultValue === nextProps.defaultValue &&
        (nextProps.value == undefined || nextProps.value == ''))
    );
  }

  render() {
    return <TextInput {...this.props} />;
  }
}

const checkText = text => {
  if (text === '' || text === void 666 || !/\S/.test(text)) {
    return false;
  }
  return true;
};

const Des = Auto(s => s.createJob.description);

export default class Description extends React.Component {
  onFormChange = (key, text) => {
    Put(state => {
      state.createJob.description[key] = text;
    });
  };

  checkDescription = () => {
    const store = getStore().createJob.description;
    if (
      checkText(store.Company) &&
      checkText(store.description) &&
      checkText(store.JobTitle)
    ) {
      this.props.navigation.navigate('JobType');
    } else {
      this.dropdown.alertWithType(
        'error',
        'Error',
        'Job Title, Company, Description can not be empty'
      );
    }
  };

  render() {
    return (
      <React.Fragment>
        <Header
          title={
            <View>
              <Header.LargeTitle>Create job: Description</Header.LargeTitle>
              <Header.Title>Step 2 of 4</Header.Title>
            </View>
          }
          leftButton={[
            <EasyTap key={0} onPress={() => this.props.navigation.goBack()}>
              <Entypo size={16} color="white" name="chevron-thin-left" />
            </EasyTap>,
          ]}
        />
        {Des(des => {
          return (
            <KeyboardAwareScrollView>
              <Title text="JOB DESCRIPTION" />
              <Kohana
                inputStyle={{fontSize: 14}}
                useNativeDriver
                label="Job Title"
                labelStyle={{fontWeight: '100', fontSize: 14}}
                iconSize={14}
                iconClass={FontAwesome}
                iconName={'pencil'}
                // TextInput props
                value={des.JobTitle}
                onChangeText={text => this.onFormChange('JobTitle', text)}
                autoCapitalize={'none'}
                autoCorrect={false}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: 48,
                }}
              />
              <Kohana
                inputStyle={{fontSize: 14}}
                useNativeDriver
                label="Company"
                labelStyle={{fontWeight: '100', fontSize: 14}}
                iconSize={14}
                iconClass={FontAwesome}
                iconName={'pencil'}
                // TextInput props
                value={des.Company}
                onChangeText={text => this.onFormChange('Company', text)}
                autoCapitalize={'none'}
                autoCorrect={false}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: 48,
                }}
              />
              <View style={{padding: 16, backgroundColor: 'white'}}>
                <LLTextInput
                  onChangeText={text => this.onFormChange('description', text)}
                  value={des.description}
                  placeholder="Description"
                  multiline
                  numberOfLines={8}
                  style={{height: 150}}
                />
              </View>
              <Title text="POSITION" />
              <Stepper
                value={des.position}
                onChange={number => this.onFormChange('position', number)}
              />
            </KeyboardAwareScrollView>
          );
        })}
        <NextBottom onPress={this.checkDescription} />
        <DropdownAlert
          showCancel
          updateStatusBar={false}
          closeInterval={1500}
          panResponderEnabled={false}
          zIndex={1000}
          ref={ref => (this.dropdown = ref)}
        />
      </React.Fragment>
    );
  }
}
