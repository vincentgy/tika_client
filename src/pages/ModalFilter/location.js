import React from 'react';
import {View, ScrollView, Platform} from 'react-native';

import {Regions, Disctrict} from '../PostJob/area';
import {WIDTH, HEIGHT} from '../../utils/plaform';
import {Theme} from '../../utils/color';
import {produce} from 'immer';
import styled from 'styled-components';
import SelectItem from '../../public/SelectItem';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';
import {Entypo} from '../../components/Icons';
import * as Animatable from 'react-native-animatable';

const StyledText = styled.Text`
  color: ${props => (props.active ? Theme : '#8c8c8c')};
`;

const RegionItem = styled.TouchableOpacity`
  padding: 12px;
  background-color: ${props => (props.active ? '#f8f8f8' : 'null')};
  flex-direction: row;
  justify-content: space-between;
`;

const BlackBlock = styled.TouchableOpacity`
  background-color: rgba(0, 0, 0, 0.3);
  width: ${(WIDTH * 2) / 7};
  height: 100%;
`;

class LocationSelector extends React.PureComponent {
  static defaultProps = {
    onChange: () => {},
  };

  state = {
    region: true,
    Disctrict: null,
    currentDisctrict: {},
    currentRegion: '',
  };

  componentDidMount() {
    this.setState({
      currentDisctrict: this.props.disctrict,
      currentRegion: this.props.region,
    });
  }

  selectRegion = ({id, region}) => {
    this.setState(
      {
        region: false,
        Disctrict: Disctrict[id],
        currentRegion: region,
      },
      () => {
        this.DistrictView.transition(
          {marginLeft: WIDTH},
          {marginLeft: 0},
          240,
          false
        );
      }
    );
  };

  onBackToRegion = () => {
    this.setState({
      region: true,
    });
  };

  onSelectDistrict = name => {
    const newState = produce(this.state.currentDisctrict, draft => {
      if (draft[name] === 1) {
        draft[name] = 0;
      } else {
        draft[name] = 1;
      }
    });
    this.setState({currentDisctrict: newState});
    this.props.onChange({
      region: this.state.currentRegion,
      disctrict: newState,
    });
  };

  getDistrictView = node => (this.DistrictView = node);
  getRegionView = node => (this.RegionView = node);

  render() {
    return (
      <View style={{width: WIDTH, height: 350}}>
        <ScrollView>
          <Animatable.View ref={this.getRegionView}>
            {Regions.map(i => (
              <RegionItem onPress={() => this.selectRegion(i)} key={i.id}>
                <StyledText>{i.region}</StyledText>
                <Entypo
                  size={12}
                  key={0}
                  name="chevron-thin-right"
                  color="#8c8c8c"
                />
              </RegionItem>
            ))}
          </Animatable.View>
        </ScrollView>
        {this.state.region ? null : (
          <View style={{flex: 1, flexDirection: 'row', position: 'absolute'}}>
            <BlackBlock onPress={this.onBackToRegion} activeOpacity={1} />
            <ScrollView
              style={{
                height: 350,
                width: WIDTH,
                backgroundColor: 'white',
              }}>
              <Animatable.View
                ref={this.getDistrictView}
                style={{backgroundColor: 'white'}}>
                {this.state.Disctrict.map(i => (
                  <SelectItem
                    onPress={() => this.onSelectDistrict(i.name)}
                    key={i.name}
                    active={
                      this.state.currentDisctrict[i.name] === 1 ? true : false
                    }>
                    {i.name}
                  </SelectItem>
                ))}
              </Animatable.View>
            </ScrollView>
          </View>
        )}
      </View>
    );
  }
}

export default LocationSelector;
