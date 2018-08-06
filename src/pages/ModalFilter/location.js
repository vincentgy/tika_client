import React from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';

import {Regions, Disctrict} from '../PostJob/area';
import {WIDTH} from '../../utils/plaform';
import {Theme} from '../../utils/color';
import {produce} from 'immer';
import {Ionicons} from '../../components/Icons';
import styled from 'styled-components';

const StyledText = styled.Text`
  color: ${props => (props.active ? Theme : '#8c8c8c')};
`;

const RegionItem = styled.TouchableOpacity`
  padding: 12px;
  background-color: ${props => (props.active ? '#f8f8f8' : 'null')};
  flex-direction: row;
  justify-content: space-between;
`;

const ButtonGroup = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: 'rgba(120,120,120,0.1)',
      }}>
      <TouchableOpacity style={{width: WIDTH / 2, padding: 12}}>
        <StyledText style={{textAlign: 'center'}}>Reset</StyledText>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          borderLeftWidth: 1,
          borderLeftColor: 'rgba(120,120,120,0.1)',
          width: WIDTH / 2,
          padding: 12,
        }}>
        <StyledText style={{textAlign: 'center', color: Theme}}>
          Comfirm
        </StyledText>
      </TouchableOpacity>
    </View>
  );
};

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
      <View>
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
              <RegionItem
                key={item.id}
                onPress={() => this.onSelectedDisctict(item.name)}>
                <StyledText
                  active={this.state.selectedDisctict[item.name] === true}>
                  {item.name}
                </StyledText>
                {this.state.selectedDisctict[item.name] === true ? (
                  <Ionicons
                    size={20}
                    style={{marginRight: 4}}
                    name="ios-checkmark-circle"
                    col
                    color={Theme}
                  />
                ) : null}
              </RegionItem>
            ))}
          </ScrollView>
        </View>
        <ButtonGroup />
      </View>
    );
  }
}

export default LocationSelector;
