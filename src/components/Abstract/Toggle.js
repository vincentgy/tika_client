import React from 'react';

export default class Toggle extends React.PureComponent {
  state = {
    toggle: false,
  };

  control = () => {
    this.setState({
      toggle: !this.state.toggle,
    });
  };

  render() {
    return this.props.children(this.control, this.state.toggle);
  }
}
