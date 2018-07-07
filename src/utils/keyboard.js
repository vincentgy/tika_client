import React from 'react';
import {Keyboard} from 'react-native';

export default class KeyboardDetector extends React.Component {
  state = {
    isShow: false,
    height: 0,
  };

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardWillShow',
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardWillHide',
      this._keyboardDidHide
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = e => {
    this.setState({
      height: e.endCoordinates.height,
      isShow: true,
    });
  };

  _keyboardDidHide = () => {
    this.setState({
      isShow: false,
    });
  };

  render() {
    return this.props.children(this.state.isShow, this.state.height);
  }
}
