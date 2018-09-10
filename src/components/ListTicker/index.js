import React from 'react';
import {View, Text} from 'react-native';
import SelectItem from '../../public/SelectItem';

export default class ListTicker extends React.Component {
  static defaultProps = {
    data: ['one', 'two', 'three'],
    onChange: () => null,
    currentActive: 'one',
  };

  render() {
    return (
      <View style={{backgroundColor: 'white'}}>
        {this.props.data.map((data, idx) => (
          <SelectItem
            key={idx}
            active={this.props.currentActive === data}
            onPress={() => this.props.onChange(data, idx)}>
            <Text>
              {this.props.renderText ? this.props.renderText(data) : data}
            </Text>
          </SelectItem>
        ))}
      </View>
    );
  }
}
