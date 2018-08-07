import React from 'react';
import styled from 'styled-components';
import {Ionicons} from '../../components/Icons';
import {Theme} from '../../utils/color';

const RegionItem = styled.TouchableOpacity`
  padding: 12px;
  background-color: ${props => (props.active ? '#f8f8f8' : 'null')};
  flex-direction: row;
  justify-content: space-between;
`;

const StyledText = styled.Text`
  color: ${props => (props.active ? Theme : '#8c8c8c')};
`;

export default ({onPress, active, children}) => {
  return (
    <RegionItem onPress={onPress}>
      <StyledText active={active}>{children}</StyledText>
      {active ? (
        <Ionicons
          size={20}
          style={{marginRight: 4}}
          name="ios-checkmark-circle"
          col
          color={Theme}
        />
      ) : null}
    </RegionItem>
  );
};
