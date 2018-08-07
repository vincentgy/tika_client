import React from 'react';
import {View, ScrollView} from 'react-native';

import {Regions, Disctrict} from '../PostJob/area';
import {WIDTH} from '../../utils/plaform';
import {Theme} from '../../utils/color';
import {produce} from 'immer';
import styled from 'styled-components';
import SelectItem from '../../public/SelectItem';

const StyledText = styled.Text`
  color: ${props => (props.active ? Theme : '#8c8c8c')};
`;

const RegionItem = styled.TouchableOpacity`
  padding: 12px;
  background-color: ${props => (props.active ? '#f8f8f8' : 'null')};
  flex-direction: row;
  justify-content: space-between;
`;

class LocationSelector extends React.PureComponent {
  state = {
    selectedRegion: 'Auckland',
    currentDisctrict: Disctrict['1'],
    selectedDisctict: {},
  };

  onChange = () => {
    this.props.onChange &&
      this.props.onChange({
        region: this.state.selectedRegion,
        disctrict: this.state.selectedDisctict,
      });
  };

  componentDidMount() {
    const {region, disctrict} = this.props;
    // 快速切换会崩溃,因此这里要判断
    const selectedRegion = Regions.find(item => item.region === region);
    if (selectedRegion) {
      const id = selectedRegion.id;
      if (id) {
        this.setState({
          selectedRegion: region || 'Auckland',
          currentDisctrict: Disctrict[id],
          selectedDisctict: disctrict || {},
        });
      }
    }
  }

  onSelectedRegion = Region => {
    // 快速切换会崩溃,因此这里要判断
    const selectedRegion = Regions.find(item => item.region === Region);
    if (selectedRegion) {
      const id = selectedRegion.id;
      this.setState(
        {
          selectedRegion: Region,
          currentDisctrict: Disctrict[id],
          selectedDisctict: {},
        },
        () => this.onChange()
      );
    }
  };

  onSelectedDisctict = Disctrict => {
    // 多选
    const newState = produce(this.state.selectedDisctict, draft => {
      if (draft[Disctrict] === true) {
        draft[Disctrict] = false;
      } else {
        draft[Disctrict] = true;
      }
    });

    this.setState(
      {
        selectedDisctict: newState,
      },
      () => this.onChange()
    );
  };

  render() {
    return (
      <View style={{flexDirection: 'row', height: 350}}>
        <ScrollView style={{width: WIDTH * 0.4, backgroundColor: 'white'}}>
          {Regions.map(item => (
            <RegionItem
              activeOpacity={1}
              active={item.region === this.state.selectedRegion}
              onPress={() => this.onSelectedRegion(item.region)}
              key={item.id}>
              <StyledText active={item.region === this.state.selectedRegion}>
                {item.region}
              </StyledText>
            </RegionItem>
          ))}
        </ScrollView>
        <ScrollView style={{width: WIDTH * 0.6, backgroundColor: '#f8f8f8'}}>
          {this.state.currentDisctrict.map(item => (
            <SelectItem
              active={this.state.selectedDisctict[item.name] === true}
              key={item.id}
              onPress={() => this.onSelectedDisctict(item.name)}>
              {item.name}
            </SelectItem>
          ))}
        </ScrollView>
      </View>
    );
  }
}

export default LocationSelector;
