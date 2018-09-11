import React from 'react';
import {View, findNodeHandle} from 'react-native';
import TagInput from '../TagInput';
import ListTicker from '../ListTicker';
import DataPicker from '../DataPicker';
import List from '../List';
import {produce} from 'immer';
import {Kohana} from 'react-native-textinput-effects';
import {FontAwesome} from '../Icons';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const FormType = {
  Text: 'text',
  Date: 'date',
  Bool: 'bool',
  Tick: 'tick',
  Tags: 'tags',
  Group: () => [],
};

const TimixForm = formScheme => {
  const formData = {};
  Object.keys(formScheme).forEach(key => {
    formData[key] = {type: formScheme[key], value: ''};
  });

  return class Form extends React.Component {
    constructor(props) {
      super(props);
      this.state = {...formData};
    }

    getFormData = () => {
      const datas = {};
      Object.keys(this.state).forEach(key => {
        datas[key] = this.state[key].value;
      });
      return datas;
    };

    onFormChange = (key, value) => {
      this.setState({
        [key]: produce(this.state[key], draft => {
          draft.value = value;
        }),
      });
    };

    render() {
      return (
        <KeyboardAwareScrollView
          enableAutomaticScroll
          enableOnAndroid
          extraHeight={-64}
          extraScrollHeight={-64}
          keyboardOpeningTime={50}
          resetScrollToCoords={{x: 0, y: 0}}>
          <View>
            {Object.keys(this.state).map((key, index) => {
              const elementType = this.state[key].type;
              if (elementType === 'text') {
                return (
                  <Kohana
                    inputStyle={{fontSize: 14}}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      height: 48,
                    }}
                    useNativeDriver
                    label={`${key}`}
                    onChangeText={text => this.onFormChange(key, text)}
                    key={index}
                    labelStyle={{fontWeight: '100', fontSize: 14}}
                    iconSize={14}
                    iconClass={FontAwesome}
                    iconName={'pencil'}
                    // TextInput props
                    autoCapitalize={'none'}
                    autoCorrect={false}
                  />
                );
              }
              if (elementType === 'tags') {
                return (
                  <TagInput
                    onAddTag={tags => this.onFormChange(key, [...tags])}
                    key={index}
                    placeholder={`${key}`}
                  />
                );
              }
              if (elementType === 'tick') {
                return (
                  <ListTicker
                    currentActive={this.state[key].value}
                    onChange={data => this.onFormChange(key, data)}
                    data={this.props[key]}
                    key={index}
                  />
                );
              }
              if (elementType === 'bool') {
                return <ListTicker data={['bool']} key={index} />;
              }
              if (elementType === 'date') {
                return (
                  <DataPicker
                    key={index}
                    onComfirm={(month, year) =>
                      this.onFormChange(key, [month, year])
                    }>
                    {(setOpen, props, data) => (
                      <List.Item
                        onPress={setOpen}
                        title={key}
                        desc={`${data[0]}/${data[1]}`}
                      />
                    )}
                  </DataPicker>
                );
              }
              return null;
            })}
          </View>
        </KeyboardAwareScrollView>
      );
    }
  };
};

TimixForm.FormType = FormType;

export default TimixForm;
