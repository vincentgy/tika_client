import React from 'react';
import styled from 'styled-components';
import {Platform, StatusBar} from 'react-native';
// import PropTypes from 'prop-types';

import {Theme} from '../../utils/color';
import {IOSBar} from '../StatusBar';

const HeaderContainer = styled.View`
  height: 48px;
  background-color: ${Theme};
  flex-direction: row;
  justify-content: space-between;
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
    const {leftButton, rightButton} = this.props;

    return (
      <React.Fragment>
        {Platform.OS === 'ios' ? (
          <IOSBar />
        ) : (
          <StatusBar backgroundColor={Theme} />
        )}
        <HeaderContainer>
          <FlexContainer>
            {leftButton.map(rb => {
              return rb;
            })}
          </FlexContainer>
          {this.props.title}
          <FlexContainer>
            {rightButton.map(rb => {
              return rb;
            })}
          </FlexContainer>
        </HeaderContainer>
      </React.Fragment>
    );
  }
}

export default Header;
