import React from 'react';
import styled from 'styled-components';
import {Platform, StatusBar} from 'react-native';
// import PropTypes from 'prop-types';

import {Theme} from '../../utils/color';

const IOSStatusBar = styled.View`
  height: 20px;
  background-color: white;
`;

const HeaderContainer = styled.View`
  height: 48px;
  background-color: white;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const FlexContainer = styled.View`
  flex-direction: row;
  align-items: center;
  height: 100%;
`;

class Header extends React.Component {
  static defaultProps = {
    rightButton: [],
    leftButton: [],
  };

  // <Entypo size={16} color="white" key={0} name="chevron-thin-left" onPress />

  render() {
    const {leftButton, rightButton, style, StatusBarStyle} = this.props;

    return (
      <React.Fragment>
        {Platform.OS === 'ios' ? (
          <IOSStatusBar style={StatusBarStyle}>
            <StatusBar barStyle={'dark-content'} />
          </IOSStatusBar>
        ) : (
          <StatusBar backgroundColor={Theme} />
        )}
        <HeaderContainer>{this.props.title}</HeaderContainer>
      </React.Fragment>
    );
  }
}

export default Header;
