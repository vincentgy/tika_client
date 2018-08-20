import React from 'react';
import styled from 'styled-components';
import {StatusBar} from 'react-native';
import {Theme} from '../../utils/color';

const IOSStatusBar = styled.View`
  height: 20px;
  background-color: ${props => (props.color ? props.color : Theme)};
`;

export const IOSBar = ({barStyle = 'light-content', color}) => {
  return (
    <IOSStatusBar color={color}>
      <StatusBar barStyle={barStyle} />
    </IOSStatusBar>
  );
};
