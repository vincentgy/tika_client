import React from 'react';
import {View, TextInput} from 'react-native';
import * as Animatable from 'react-native-animatable';
import styled from 'styled-components';

import {WIDTH} from '../../utils/plaform';

const InputWrapperStyled = styled.View`
  margin-left: 15px;
  background-color: white;
  width: ${WIDTH};
  border-bottom-width: 1px;
  border-color: rgba(120, 120, 120, 0.2);
  border-style: solid;
`;

class Input extends React.Component {
  state = {
    filled: false,
  };

  handleTextRef = ref => (this.text = ref);

  static defaultProps = {
    name: 'name',
    placeholder: 'placcholder',
    onChangeText: () => 666,
  };

  handleChangeText = text => {
    this.props.onChangeText(text);
    if (text.length > 0) {
      this.setState({
        filled: true,
      });
    } else {
      this.setState({
        filled: false,
      });
    }
  };

  render() {
    return (
      <View style={{backgroundColor: 'white'}}>
        <InputWrapperStyled>
          <Animatable.Text
            ref={this.handleTextRef}
            style={{
              position: 'absolute',
              marginTop: 17,
              color: '#a0b0a0',
              fontWeight: '100',
            }}
            iterationCount={1}
            direction="normal">
            {this.props.placeholder}
          </Animatable.Text>
          <TextInput
            underlineColorAndroid="transparent"
            style={{
              height: 51,
              fontSize: 15,
            }}
            autoFocus={this.props.autoFocus}
            onEndEditing={this.props.onEndEditing}
            onChangeText={this.handleChangeText}
            returnKeyType="done"
            onBlur={() => {
              !this.state.filled &&
                this.text.transition(
                  {marginTop: 0, fontSize: 10},
                  {marginTop: 17, fontSize: 15}
                );
            }}
            onFocus={() => {
              !this.state.filled &&
                this.text.transition(
                  {marginTop: 17, fontSize: 15},
                  {marginTop: 0, fontSize: 10}
                );
            }}
          />
        </InputWrapperStyled>
      </View>
    );
  }
}

export default Input;
