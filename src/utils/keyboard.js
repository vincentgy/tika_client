import React from 'react';
import {Keyboard} from 'react-native';

export default class KeyboardDetector extends React.Component {
  state = {
    isShow: false,
    height: 0,
    didMove: false,
  };

  getViewContainerRef = node => (this.View = node);

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
    if (!this.state.didMove) {
      this.View.transition(
        {paddingBottom: 0},
        {paddingBottom: e.endCoordinates.height}
      );
    }

    this.setState({
      height: e.endCoordinates.height,
      isShow: true,
      didMove: true,
    });
  };

  _keyboardDidHide = () => {
    this.View.transition(
      {paddingBottom: this.state.height},
      {paddingBottom: 0}
    );
    this.setState({
      isShow: false,
      didMove: false,
    });
  };

  render() {
    return this.props.children(
      this.state.isShow,
      this.state.height,
      this.getViewContainerRef
    );
  }
}
