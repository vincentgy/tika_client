import React from 'react';
import {View, findNodeHandle, Text, TextInput, Platform} from 'react-native';
import TagInput from '../TagInput';
import ListTicker from '../ListTicker';
import DataPicker from '../DataPicker';
import List from '../List';
import {produce} from 'immer';
import {Kohana} from 'react-native-textinput-effects';
import {FontAwesome} from '../Icons';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CategoryModal from '../CategoryModal';

const FormType = {
  Text: 'text',
  Date: 'date',
  Bool: 'bool',
  Tick: 'tick',
  Tags: 'tags',
  Cate: 'cate',
};

const UseKeyboardAwareScrollView = ({notUse, children}) => {
  if (notUse) return children;
  return (
    <KeyboardAwareScrollView
      enableAutomaticScroll
      enableOnAndroid
      extraHeight={-64}
      extraScrollHeight={-64}
      resetScrollToCoords={{x: 0, y: 0}}>
      {children}
    </KeyboardAwareScrollView>
  );
};

const TimixForm = formScheme => {
  const formData = {};
  Object.keys(formScheme).forEach(key => {
    if (formScheme[key] === 'date') {
      formData[key] = {type: formScheme[key], value: ['Jan', 2017]};
    } else {
      formData[key] = {type: formScheme[key], value: ''};
    }
  });

  return class Form extends React.Component {
    static defaultProps = {
      notUseKeyboardAwareScrollView: false,
    };
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
        <UseKeyboardAwareScrollView
          notUse={this.props.notUseKeyboardAwareScrollView}>
          <View>
            {Object.keys(this.state).map((key, index) => {
              const elementType = this.state[key].type;
              if (elementType === 'text') {
                return (
                  <Kohana
                    inputStyle={{fontSize: 14}}
                    useNativeDriver
                    label={`${key}`}
                    key={index}
                    labelStyle={{fontWeight: '100', fontSize: 14}}
                    iconSize={14}
                    iconClass={FontAwesome}
                    iconName={'pencil'}
                    // TextInput props
                    value={this.state[key].value}
                    onChangeText={text => this.onFormChange(key, text)}
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      height: 48,
                    }}
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
              if (elementType === 'cate') {
                return <CategoryModal key={index} />;
              }
              return null;
            })}
          </View>
        </UseKeyboardAwareScrollView>
      );
    }
  };
};

TimixForm.FormType = FormType;
TimixForm.Combind = forms => {
  return class wrapper extends React.Component {
    getFormData = () => {
      const CombindData = {};
      Object.keys(this.refs).forEach(key => {
        const instance = this.refs[key];
        const info = instance.getFormData();
        Object.keys(info).forEach(k => {
          CombindData[k] = info[k];
        });
      });

      return CombindData;
    };

    render() {
      const FormsCombinded = Object.keys(forms).map(key => {
        //如果有header
        if (forms[key].header) {
          const FormWithHeader = forms[key].form;
          return (
            <List
              key={key}
              title={
                <Text style={{marginLeft: 16, marginTop: 16, color: '#abb0b0'}}>
                  {forms[key].header}
                </Text>
              }>
              <FormWithHeader
                {...this.props}
                notUseKeyboardAwareScrollView
                ref={`${key}`}
              />
            </List>
          );
        }
        // 如果没有header
        const FormWithNoHeader = forms[key];
        return (
          <FormWithNoHeader
            {...this.props}
            notUseKeyboardAwareScrollView
            key={key}
            ref={`${key}`}
          />
        );
      });

      return (
        <KeyboardAwareScrollView
          enableAutomaticScroll
          enableOnAndroid
          extraHeight={-64}
          extraScrollHeight={
            this.props.offset === void 666 ? -64 : this.props.offset
          }
          resetScrollToCoords={{x: 0, y: 0}}>
          {FormsCombinded}
        </KeyboardAwareScrollView>
      );
    }
  };
};

export default TimixForm;
