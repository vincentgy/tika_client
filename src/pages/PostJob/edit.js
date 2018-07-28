import React from 'react';
import {View, TextInput, Platform} from 'react-native';
import {connect} from 'react-redux';
import Header from '../../components/Header';

@connect(state => ({...state.postJob}))
export default class Edit extends React.Component {
  shouldComponentUpdate(nextProps) {
    // for ios
    // when enter chinese we need to pretect component
    // to be update when field not change
    // typing `pinyin` will not change field but still fire `onChangeText`
    return (
      Platform.OS !== 'ios' ||
      this.props[this.props.currentField] === nextProps[nextProps.currentField]
    );
  }

  render() {
    return (
      <View style={{backgroundColor: 'white'}}>
        <Header />
        <TextInput
          onChangeText={text => {
            this.props.dispatch({
              type: 'EditPostJob',
              payload: text,
            });
          }}
          value={this.props[this.props.currentField]}
          onEndEditing={() => this.props.navigation.goBack(null)}
          returnKeyType="done"
          autoFocus
          placeholder="Edit company name"
        />
      </View>
    );
  }
}
