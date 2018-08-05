import React from 'react';
import {View, TouchableOpacity, Platform, Text, Modal} from 'react-native';
import {WIDTH, HEIGHT} from '../../utils/plaform';

import {Entypo} from '../Icons';
import Toggle from '../Abstract/Toggle';
import styled from 'styled-components';

import * as Animatable from 'react-native-animatable';

const FilterContainer = styled.View`
  height: 40px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(120, 120, 120, 0.1);
  background-color: white;
  flex-direction: row;
  align-items: center;
`;

const RealFilter = styled.TouchableOpacity`
  margin-top: ${() => (Platform.OS === 'ios' ? 68 : 48)}px;
  height: 40px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(120, 120, 120, 0.1);
  background-color: white;
  flex-direction: row;
  align-items: center;
`;

const FilterItem = props => (
  <TouchableOpacity
    {...props}
    style={{
      ...props.style,
      borderLeftWidth: 1,
      borderLeftColor: 'rgba(120,120,120,0.1)',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      height: 24,
    }}>
    <View>
      <Text style={{textAlign: 'center', fontSize: 10}}>1231</Text>
    </View>
    <Entypo size={8} name="chevron-thin-down" style={{marginLeft: 8}} />
  </TouchableOpacity>
);

class Filter extends React.Component {
  static defaultProps = {};

  getFilterView = node => (this.filter = node);

  render() {
    return (
      <Toggle>
        {(ctrl, state) => (
          <React.Fragment>
            <FilterContainer>
              <FilterItem
                onPress={() => {
                  ctrl(() => {
                    this.filter.transition({height: 0}, {height: 400});
                  });
                }}
                style={{width: WIDTH / 4}}
              />
              <FilterItem style={{width: WIDTH / 4}} />
              <FilterItem style={{width: WIDTH / 4}} />
              <FilterItem style={{width: WIDTH / 4}} />
            </FilterContainer>
            <Modal
              animationType="none"
              transparent={true}
              visible={state}
              onRequestClose={() => ctrl()}>
              <RealFilter style={{}} onPress={ctrl}>
                <FilterItem onPress={() => ctrl()} style={{width: WIDTH / 4}} />
                <FilterItem style={{width: WIDTH / 4}} />
                <FilterItem style={{width: WIDTH / 4}} />
                <FilterItem style={{width: WIDTH / 4}} />
              </RealFilter>
              <Animatable.View
                ref={this.getFilterView}
                style={{
                  backgroundColor: '#f8f8f8',
                  width: WIDTH,
                }}
              />
              <TouchableOpacity
                onPress={ctrl}
                style={{
                  width: WIDTH,
                  height: HEIGHT,
                  backgroundColor: 'rgba(0,0,0,0.6)',
                }}
              />
            </Modal>
          </React.Fragment>
        )}
      </Toggle>
    );
  }
}

export default Filter;
