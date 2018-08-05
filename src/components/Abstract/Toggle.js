import React from 'react';

export default class Toggle extends React.PureComponent {
  state = {
    toggle: false,
    customState: '',
  };

  control = customState => {
    this.setState({
      toggle: !this.state.toggle,
      customState,
    });
  };

  render() {
    return this.props.children(
      this.control,
      this.state.toggle,
      this.state.customState
    );
  }
}
