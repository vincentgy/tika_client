import React from 'react';

import {View, Text} from 'react-native';
import {WIDTH} from '../../utils/plaform';
import Picker from 'react-native-wheel-picker';
var PickerItem = Picker.Item;

export default class MoneyRange extends React.Component {
  static defaultProps = {
    onChange: () => void 666,
    minValue: 2,
    maxValue: 3,
  };

  state = {
    itemListLeft: [0, 50000, 75000, 100000, 125000, 150000, 200000],
    itemListRight: [0, 50000, 75000, 100000, 125000, 150000, 200000],
  };

  onPickerSelectLeft(index) {
    this.props.onChange({
      min: index,
      max: this.props.maxValue,
    });
  }
  onPickerSelectRight(index) {
    this.props.onChange({
      min: this.props.minValue,
      max: index,
    });
  }

  render() {
    return (
      <View style={{flexDirection: 'row'}}>
        <Picker
          style={{width: WIDTH / 2, height: 100}}
          selectedValue={this.props.minValue}
          itemStyle={{
            color: 'black',
            fontSize: 18,
            height: 145,
          }}
          onValueChange={index => this.onPickerSelectLeft(index)}>
          {this.state.itemListLeft.map((value, i) => (
            <PickerItem
              label={value / 1000 + 'k'}
              value={i}
              key={'money' + value}
            />
          ))}
        </Picker>
        <Picker
          style={{width: WIDTH / 2, height: 100}}
          selectedValue={this.props.maxValue}
          itemStyle={{
            color: 'black',
            fontSize: 18,
            height: 145,
          }}
          onValueChange={index => this.onPickerSelectRight(index)}>
          {this.state.itemListRight.map((value, i) => (
            <PickerItem
              label={value / 1000 + 'k'}
              value={i}
              key={'money' + value}
            />
          ))}
        </Picker>
      </View>
    );
  }
}
