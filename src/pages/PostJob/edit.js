import React from 'react';
import {View, TextInput} from 'react-native';
import {connect} from 'react-redux';

@connect(state => ({...state.postJob}))
export default class Edit extends React.Component {
  render() {
    return (
      <View>
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
