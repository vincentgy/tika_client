import React from 'react';
import {View, TextInput, TouchableOpacity, Text} from 'react-native';
import Header from '../../components/Header';
import {WithGoback} from '../../utils/withGoback';
import {connect} from 'react-redux';

@WithGoback
class Description extends React.PureComponent {
  state = {
    text: '',
  };

  onChangeText = text => {
    this.setState({text});
  };

  render() {
    return (
      <View>
        <Header
          rightButton={[
            <TouchableOpacity
              key={1}
              onPress={() => {
                this.props.dispatch({
                  type: 'EditPostJob',
                  payload: this.state.text,
                });
                this.props.goback();
              }}>
              <Text>done</Text>
            </TouchableOpacity>,
          ]}
        />
        <View style={{height: 200, backgroundColor: 'white'}}>
          <TextInput
            value={this.state.text}
            onChangeText={this.onChangeText}
            onEndEditing={() => {
              this.props.dispatch({
                type: 'EditPostJob',
                payload: this.state.text,
              });
            }}
            autoFocus
            multiline
            underlineColorAndroid={'transparent'}
          />
        </View>
      </View>
    );
  }
}

export default connect()(Description);
