import React from 'react';
import styled from 'styled-components';
import {Ionicons, MaterialCommunityIcons} from '../../components/Icons';
import {Theme} from '../../utils/color';

const RegionItem = styled.TouchableOpacity`
  padding: 12px;
  padding-left: 16px;
  background-color: ${props => (props.active ? '#f8f8f8' : 'null')};
  flex-direction: row;
  justify-content: space-between;
`;

const StyledText = styled.Text`
  color: ${props => (props.active ? Theme : '#8c8c8c')};
`;

export default ({onPress, active, children, style}) => {
  return (
    <RegionItem onPress={onPress} style={style}>
      <StyledText active={active}>{children}</StyledText>
      {active ? (
        <Ionicons
          size={14}
          style={{marginRight: 5.5}}
          name="ios-checkmark-circle"
          color={Theme}
        />
      ) : (
        <MaterialCommunityIcons
          size={14}
          style={{marginRight: 4}}
          name="checkbox-blank-circle-outline"
          color="#abb0b0"
        />
      )}
    </RegionItem>
  );
};
