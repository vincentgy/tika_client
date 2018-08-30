import SegmentedControlTab from 'react-native-segmented-control-tab'; //https://github.com/kirankalyan5/react-native-segmented-control-tab#props
import React from 'react';
import {View, TouchableOpacity, Text, ScrollView} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {WIDTH} from '../../utils/plaform';
import {MaterialIcons, Ionicons, Entypo} from '../../components/Icons';
import styled from 'styled-components';
import {Regions, Disctrict} from '../PostJob/area';
import {Put, Ctx, Auto} from '../../store';
import SelectItem from '../../public/SelectItem';
import {NetworkManager} from '../../manager/networkManager';

const FlexBox = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: ${WIDTH / 2};
  height: 40px;
  border-bottom-color: rgba(120, 120, 120, 0.1);
  border-bottom-width: 0.5px;
`;

const TableCell = styled.TouchableOpacity`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: ${WIDTH};
  padding-left: 8px;
  padding-right: 8px;
  padding-bottom: 16px;
  padding-top: 16px;
  border-bottom-width: 0.5px;
  border-bottom-color: rgba(120, 120, 120, 0.1);
`;

const BackButton = styled.TouchableOpacity`
  position: absolute;
  height: 24px;
  flex-direction: row;
  z-index: 1000;
  margin-top: 4px;
  margin-left: 8px;
`;

const Category = Auto(state => ({
  categories: state.categories,
  categoriesIds: state.categoriesIds,
}));

const JobType = Auto(state => ({
  jobType: state.jobType,
  jobTypeIds: state.jobTypeId,
}));

export class FilterTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: props.segmentIndex,
      selectedRegionId: -1,
      selectedRegion: 'Region',
    };
    //默认点进来的时候是 cate
    if (props.segmentIndex === 1) {
      this.getCate();
    }
  }

  async getCate() {
    const m = new NetworkManager();
    const cate = await m.getCategory();
    Put(state => {
      if (state.categories.length === 0) state.categories = cate.data;
    });
  }

  handleIndexChange = index => {
    this.setState(
      {
        selectedIndex: index,
      },
      () => {
        if (index === 1) {
          this.getCate();
        }
      }
    );
  };

  getContainer = node => (this.Container = node);
  getDistrict = node => (this.District = node);

  componentDidMount() {
    this.Container.transition({height: 0}, {height: 380});
    if (this.District) {
      this.District.transition({height: 0}, {height: 316});
    }
  }

  handleSelectCate = i => {
    Put(state => {
      if (state.categoriesIds[i.id] !== 1) {
        state.categoriesIds[i.id] = 1;
      } else {
        state.categoriesIds[i.id] = 0;
      }
    });
  };

  handleSelectRegion = i => {
    Put(state => (state.regionId = i.id));

    this.setState(
      {
        selectedRegion: i.region,
      },
      () => {
        this.District.transition({marginLeft: WIDTH}, {marginLeft: 0});
      }
    );
  };
  handleGoBakc = () => {
    Put(state => {
      state.regionId = -1;
      state.districtIds = {};
    });
    this.setState({
      selectedRegion: 'Region',
    });
  };
  handleSelectDisctrict = i => {
    Put(state => {
      if (state.districtIds[i.id] !== 1) {
        state.districtIds[i.id] = 1;
      } else {
        state.districtIds[i.id] = 0;
      }
    });
  };
  handleSelectJobType = i => {
    Put(state => {
      state.jobTypeId = i;
    });
  };

  renderTab = () => {
    const index = this.state.selectedIndex;

    const Tabs = {
      0: (
        <Ctx>
          {store => (
            <React.Fragment>
              {store.regionId < 0 ? null : (
                <BackButton onPress={this.handleGoBakc}>
                  <Entypo size={16} color="#40a9ff" name="chevron-thin-left" />
                  <Text
                    style={{
                      fontWeight: '700',
                      marginLeft: 8,
                      color: '#40a9ff',
                    }}>
                    back
                  </Text>
                </BackButton>
              )}
              <View
                style={{
                  width: WIDTH,
                  height: 24,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{fontWeight: '700', textAlign: 'center'}}>
                  {this.state.selectedRegion}
                </Text>
              </View>
              {store.regionId < 0 ? (
                <ScrollView>
                  {Regions.map(i => (
                    <TableCell
                      key={i.id}
                      onPress={() => this.handleSelectRegion(i)}>
                      <Text style={{color: '#333'}}>{i.region}</Text>
                      <Entypo
                        size={12}
                        color="#abb0b0"
                        name="chevron-thin-right"
                      />
                    </TableCell>
                  ))}
                </ScrollView>
              ) : (
                <Animatable.View ref={this.getDistrict}>
                  <ScrollView style={{height: 316}}>
                    {Disctrict[store.regionId].map(i => (
                      <SelectItem
                        key={i.id}
                        active={store.districtIds[i.id] === 1}
                        onPress={() => this.handleSelectDisctrict(i)}>
                        <Text style={{color: '#333', width: WIDTH}}>
                          {i.name}
                        </Text>
                      </SelectItem>
                    ))}
                  </ScrollView>
                </Animatable.View>
              )}
            </React.Fragment>
          )}
        </Ctx>
      ),
      1: Category(cate => (
        <ScrollView style={{height: 316}}>
          {cate.categories.map(i => (
            <SelectItem
              key={i.id}
              onPress={() => this.handleSelectCate(i)}
              active={cate.categoriesIds[i.id] === 1}>
              <Text style={{color: '#333', width: WIDTH}}>{i.name}</Text>
            </SelectItem>
          ))}
        </ScrollView>
      )),
      2: JobType(state => (
        <View style={{height: 340}}>
          {Object.keys(state.jobType).map((i, idx) => (
            <SelectItem
              key={idx}
              active={state.jobTypeIds === i}
              onPress={() => this.handleSelectJobType(i)}>
              <Text style={{color: '#333', width: WIDTH}}>
                {state.jobType[i]}
              </Text>
            </SelectItem>
          ))}
        </View>
      )),
    };

    return Tabs[index];
  };

  render() {
    return (
      <View>
        <SegmentedControlTab
          tabsContainerStyle={{padding: 8, backgroundColor: '#096dd9'}}
          tabTextStyle={{color: 'white'}}
          tabStyle={{borderColor: 'white', backgroundColor: '#096dd9'}}
          activeTabTextStyle={{color: '#096dd9'}}
          activeTabStyle={{backgroundColor: 'white'}}
          values={['Location', 'Job Category', 'Job Type']}
          selectedIndex={this.state.selectedIndex}
          onTabPress={this.handleIndexChange}
        />
        <Animatable.View
          style={{width: WIDTH, backgroundColor: 'white'}}
          ref={this.getContainer}>
          <this.renderTab />
          <View
            style={{
              flexDirection: 'row',
              borderTopColor: 'rgba(120,120,120,0.1)',
              borderTopWidth: 0.5,
            }}>
            <FlexBox>
              <Text>Clear</Text>
            </FlexBox>
            <FlexBox onPress={this.props.onDone}>
              <Text style={{color: '#40a9ff'}}>Done</Text>
            </FlexBox>
          </View>
        </Animatable.View>
      </View>
    );
  }
}
