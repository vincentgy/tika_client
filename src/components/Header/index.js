import React from 'react';
import styled from 'styled-components';
import {Platform, StatusBar} from 'react-native';
// import PropTypes from 'prop-types';
import {Entypo} from '../Icons';
import {Theme} from '../../utils/color';

const IOSStatusBar = styled.View`
  height: 20px;
  background-color: #2d59d9;
`;

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

const GroupLeft = styled.View`
  margin-left: 16px;
`;

class Header extends React.Component {
  static defaultProps = {
    rightButton: [],
    leftButton: [<Entypo size={16} key={0} name="chevron-thin-left" />],
  };

  render() {
    const {leftButton, rightButton} = this.props;

    return (
      <React.Fragment>
        {Platform.OS === 'ios' ? (
          <IOSStatusBar />
        ) : (
          <StatusBar backgroundColor={Theme} />
        )}
        <HeaderContainer>
          <FlexContainer>
            {leftButton.map((rb, index) => {
              return <GroupLeft key={index}>{rb}</GroupLeft>;
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
