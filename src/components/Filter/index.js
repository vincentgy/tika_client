import React from 'react';
import {View, TouchableOpacity, Text, Modal} from 'react-native';
import {WIDTH} from '../../utils/plaform';
import {Entypo} from '../Icons';
import Toggle from '../Abstract/Toggle';
import styled from 'styled-components';

const FilterContainer = styled.View`
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
    }}>
    <View>
      <Text style={{textAlign: 'center', fontSize: 10}}>1231</Text>
    </View>
    <Entypo size={8} name="chevron-thin-down" style={{marginLeft: 8}} />
  </TouchableOpacity>
);

class Filter extends React.Component {
  static defaultProps = {};

  render() {
    return (
      <Toggle>
        {(ctrl, state) => (
          <React.Fragment>
            <FilterContainer>
              <FilterItem style={{width: WIDTH / 4}} />
              <FilterItem style={{width: WIDTH / 4}} />
              <FilterItem style={{width: WIDTH / 4}} />
              <FilterItem style={{width: WIDTH / 4}} />
            </FilterContainer>
            <Modal
              animationType="fade"
              transparent={true}
              visible={state}
              onRequestClose={() => ctrl()}
            />
          </React.Fragment>
        )}
      </Toggle>
    );
  }
}

export default Filter;
