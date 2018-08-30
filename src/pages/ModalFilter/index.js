import React from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
  Platform,
} from 'react-native';
import {WIDTH, HEIGHT} from '../../utils/plaform';
import Toggle from '../../components/Abstract/Toggle';
import styled from 'styled-components';
import Switch, {FilterItem} from './swich';
import LocationSelector from './location';
import FetchCategoris from '../../public/FetchCategoris';
import ButtonGroup from '../../public/ButtonGroup';
import JobType from './type';
import SelectItem from '../../public/SelectItem';
import {connect} from 'react-redux';
import {produce} from 'immer';
import SegmentedControlTab from 'react-native-segmented-control-tab'; //https://github.com/kirankalyan5/react-native-segmented-control-tab#props
import LinearGradient from 'react-native-linear-gradient';

class Filter extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedIndex: -1,
    };
  }

  handleIndexChange = index => {
    this.setState({
      ...this.state,
      selectedIndex: index,
    });
  };
  render() {
    return (
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#6f86d6', '#667eea']}
        style={{padding: 8, backgroundColor: 'white'}}>
        <SegmentedControlTab
          tabTextStyle={{color: 'white'}}
          tabStyle={{borderColor: 'white', backgroundColor: 'transparent'}}
          activeTabTextStyle={{color: '#667eea'}}
          activeTabStyle={{backgroundColor: 'white'}}
          values={['Location', 'Job Category', 'Job Type']}
          selectedIndex={this.state.selectedIndex}
          onTabPress={this.handleIndexChange}
        />
      </LinearGradient>
    );
  }
}

const mapState = state => {
  return {
    ...state.filter,
  };
};

export default connect(mapState)(Filter);
