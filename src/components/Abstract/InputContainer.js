import React from 'react';

export default class InputContainer extends React.Component {
  state = {
    text: '',
  };

  onChange = text => {
    this.setState({
      text,
    });
  };

  render() {
    return this.props.children(this.onChange, this.state.text);
  }
}
