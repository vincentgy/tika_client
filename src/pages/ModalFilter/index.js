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
import LinearGradient from 'react-native-linear-gradient';
import Collapsible from 'react-native-collapsible';

export default class Filter extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedIndex: 0,
      modalOpen: false,
      collapsed: false,
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
   * 发送请求给后台，获取当前选择的filter
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
    const json = await network.searchByFilter(
      s.regionId,
      s.districtIds,
      s.categoriesIds,
      s.jobTypeId,
      s.moneyRange
    );

    Put(state => {
      state.job.list = s.job.list.cloneWithRows(json.data.reverse() || []);
      state.job.loading = false;
    });
  }

  componentDidMount() {
    this.StartToFetcher();
  }

  setOpacity = collapsed => {
    this.setState({
      collapsed: collapsed,
    });
  };

  render() {
    return (
      <Collapsible collapsed={this.state.collapsed}>
        <LinearGradient
          style={{padding: 8}}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#597ef7', '#2f54eb']}>
          <SegmentedControlTab
            tabTextStyle={{color: 'white'}}
            tabStyle={{borderColor: 'white', backgroundColor: 'transparent'}}
            activeTabStyle={{backgroundColor: '#333'}}
            values={['Location', 'Job Category', 'Job Type']}
            selectedIndex={-1}
            onTabPress={this.handleOpen}
          />

          <Modal
            onRequestClose={() => {}}
            animationType="none"
            visible={this.state.modalOpen}
            transparent>
            <TouchableOpacity
              onPress={this.handleClose}
              style={{
                backgroundColor: 'transparent',
                height: 48 + (Platform.OS === 'ios' ? 20 : -4),
              }}
            />
            <FilterTab
              segmentIndex={this.state.selectedIndex}
              onDone={() => this.StartToFetcher()}
            />
            <TouchableOpacity
              onPress={this.handleClose}
              activeOpacity={1}
              style={{height: '100%', backgroundColor: 'rgba(0,0,0,0.2)'}}
            />
          </Modal>
        </LinearGradient>
      </Collapsible>
    );
  }
}
