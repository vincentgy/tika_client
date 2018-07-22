import React from 'react';
import {View} from 'react-native';

export default class Form extends React.Component {
  static defaultProps = {
    style: {},
  };

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

    return (
      <View style={{...this.props.style}}>
        {children(this.onChange, this.onSumit)}
      </View>
    );
  }
}
