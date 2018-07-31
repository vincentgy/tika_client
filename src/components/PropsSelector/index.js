import React from 'react';

export default class PropsSelector extends React.Component {
  state = {
    data: null,
  };

  select = data => {
    this.setState({
      data,
    });
  };

  render() {
    return this.props.children(this.state.data, this.select);
  }
}
