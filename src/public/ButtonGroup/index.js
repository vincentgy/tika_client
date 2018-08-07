import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import styled from 'styled-components';
import {WIDTH} from '../../utils/plaform';
import {Theme} from '../../utils/color';

const StyledText = styled.Text`
  color: ${props => (props.active ? Theme : '#8c8c8c')};
`;

export default ({comfirm}) => {
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
        onPress={comfirm}
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
