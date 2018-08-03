import React from 'react';

export default class Toggle extends React.PureComponent {
  state = {
    toggle: false,
  };

  control = fn => {
    this.setState(
      {
        toggle: !this.state.toggle,
      },
      () => {
        if (fn && fn instanceof Function) fn();
      }
    );
  };

  render() {
    return this.props.children(this.control, this.state.toggle);
  }
}
