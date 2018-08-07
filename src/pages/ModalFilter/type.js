import React from 'react';
import {View, ScrollView} from 'react-native';
import MaterialTabs from 'react-native-material-tabs'; //https://www.npmjs.com/package/react-native-material-tabs
import {Theme} from '../../utils/color';
import SelectItem from '../../public/SelectItem';
import {produce} from 'immer';

const Config = {
  0: [
    '0-50000',
    '50000-75000',
    '75000-100000',
    '100000-125000',
    '125000-150000',
    '150000-200000',
    '200000-300000',
  ],
  1: [
    '15-20',
    '20-25',
    '25-35',
    '35-50',
    '50-75',
    '75-100',
    '100-150',
    '150-200',
  ],
  2: [
    '15-20',
    '20-25',
    '25-35',
    '35-50',
    '50-75',
    '75-100',
    '100-150',
    '150-200',
  ],
  3: ['0-300', '300-500', '500-1000', '1000-1500', '1500'],
};

export default class JobType extends React.Component {
  state = {
    selectedTab: 0,
    selectedItem: {},
  };

  componentDidMount() {
    const {jobType, payRange} = this.props;
    this.setState({
      selectedTab: jobType || 0,
      selectedItem: payRange || {},
    });
  }

  onChange = () => {
    this.props.onChange &&
      this.props.onChange({
        jobType: this.state.selectedTab,
        payRange: this.state.selectedItem,
      });
  };

  onSelect = item => {
    const newState = produce(this.state.selectedItem, draft => {
      if (draft[item] === true) {
        draft[item] = false;
      } else {
        draft[item] = true;
      }
    });

    this.setState(
      {
        selectedItem: newState,
      },
      () => this.onChange()
    );
  };

  setTab = selectedTab => {
    this.setState({selectedTab, selectedItem: {}}, () => this.onChange());
  };

  render() {
    const Type = ['Full-time', 'Contract', 'Part-time', 'One-off'];

    return (
      <View>
        <MaterialTabs
          items={Type}
          selectedIndex={this.state.selectedTab}
          onChange={this.setTab}
          textStyle={{fontSize: 12}}
          uppercase={false}
          barColor="white"
          inactiveTextColor="#8c8c8c"
          indicatorColor={Theme}
          activeTextColor={Theme}
        />
        <ScrollView style={{height: 300}}>
          {Config[this.state.selectedTab].map((item, index) => (
            <SelectItem
              onPress={() => this.onSelect(item)}
              key={index}
              active={this.state.selectedItem[item] === true}>
              {item}
            </SelectItem>
          ))}
        </ScrollView>
      </View>
    );
  }
}
