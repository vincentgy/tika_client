import React from 'react';
import {View} from 'react-native';

export class Form extends React.Component {
  onChange = ({key, value}) => {
    this.setState({
      [key]: value,
    });
  };

  onSumit = () => {
    this.props.onSumit && this.props.onSumit(this.state);
  };

  render() {
    const {children} = this.props;

    return <View>{children(this.onChange, this.onSumit)}</View>;
  }
}
