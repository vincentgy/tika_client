import React from 'react';
import {View, ScrollView} from 'react-native';
import styled from 'styled-components';
import {Regions, Disctrict} from '../PostJob/area';
import {WIDTH} from '../../utils/plaform';
import {Theme} from '../../utils/color';
import {produce} from 'immer';

const RegionItem = styled.TouchableOpacity`
  padding: 12px;
  background-color: ${props => (props.active ? '#f8f8f8' : 'null')};
`;

const StyledText = styled.Text`
  color: ${props => (props.active ? Theme : 'black')};
`;

class LocationSelector extends React.Component {
  state = {
    selectedRegion: 'Auckland',
    currentDisctrict: Disctrict['1'],
    selectedDisctict: {},
  };

  onSelectedRegion = Region => {
    const id = Regions.find(item => item.region === Region).id;
    this.setState({
      selectedRegion: Region,
      currentDisctrict: Disctrict[id],
      selectedDisctict: {},
    });
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

    this.setState({
      selectedDisctict: newState,
    });
  };

  render() {
    return (
      <View style={{flexDirection: 'row'}}>
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
            <RegionItem
              key={item.id}
              onPress={() => this.onSelectedDisctict(item.name)}>
              <StyledText
                active={this.state.selectedDisctict[item.name] === true}>
                {item.name}
              </StyledText>
            </RegionItem>
          ))}
        </ScrollView>
      </View>
    );
  }
}

export default LocationSelector;
