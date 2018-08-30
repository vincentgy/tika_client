import React from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
  Platform,
  Text,
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
import {FilterTab} from './filtertab';
import {Regions} from '../PostJob/area';
import {NetworkManager} from '../../manager/networkManager';
import {Put, getStore} from '../../store';

class Filter extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedIndex: 0,
      modalOpen: false,
    };
  }

  handleIndexChange = index => {
    this.setState({
      selectedIndex: index,
    });
  };

  handleOpen = index => {
    this.setState({
      selectedIndex: index,
      modalOpen: true,
    });
  };
  handleClose = () => {
    this.setState({
      selectedIndex: 0,
      modalOpen: false,
    });
  };

  /**
   * 网络请求
   */
  async StartToFetcher() {
    this.setState({
      modalOpen: false,
    });
    const network = new NetworkManager();
    const s = getStore();
    Put(state => {
      state.job.loading = true;
    });
    const json = await network.searchByFilter(s.regionId, s.districtIds,s.categoriesIds);
    Put(state => {
      state.job.list = s.job.list.cloneWithRows(json.data);
      state.job.loading = false;
    });
  }

  render() {
    return (
      <View style={{padding: 8, backgroundColor: 'white'}}>
        <SegmentedControlTab
          tabTextStyle={{color: '#333'}}
          tabStyle={{borderColor: '#333'}}
          activeTabStyle={{backgroundColor: '#333'}}
          values={['Location', 'Job Category', 'Job Type']}
          selectedIndex={-1}
          onTabPress={this.handleOpen}
        />
        <Modal animationType="none" visible={this.state.modalOpen} transparent>
          <TouchableOpacity
            activeOpacity={1}
            // onPress={this.handleClose}
            style={{
              height: HEIGHT,
              width: WIDTH,
              backgroundColor: 'rgba(120,120,120,0.4)',
            }}>
            <View
              style={{
                backgroundColor: 'white',
                marginTop: 48 + 20,
              }}>
              <FilterTab
                segmentIndex={this.state.selectedIndex}
                onDone={() => this.StartToFetcher()}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }
}

const mapState = state => {
  return {
    ...state.filter,
  };
};

export default connect(mapState)(Filter);
