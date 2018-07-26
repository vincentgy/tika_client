import React from 'react';
import styled from 'styled-components';
import {Text, Platform} from 'react-native';
// import PropTypes from 'prop-types';
import {Entypo} from '../Icons';

const HeaderContainer = styled.View`
  margin-top: ${Platform.OS === 'ios' ? 20 : 0};
  height: 48px;
  background-color: white;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const FlexContainer = styled.View`
  flex-direction: row;
  align-items: center;
  height: 100%;
`;

const GroupRight = styled.View`
  margin-right: 16px;
`;
const GroupLeft = styled.View`
  margin-left: 16px;
`;

const Title = styled.View``;

class Header extends React.Component {
  static defaultProps = {
    rightButton: [],
    leftButton: [<Entypo size={16} key={0} name="chevron-thin-left" />],
  };

  render() {
    const {leftButton, rightButton} = this.props;

    return (
      <HeaderContainer>
        <FlexContainer>
          {leftButton.map((rb, index) => {
            return <GroupLeft key={index}>{rb}</GroupLeft>;
          })}
        </FlexContainer>
        <Title>
          <Text>我是标题</Text>
        </Title>
        <FlexContainer>
          {rightButton.map((rb, index) => {
            return <GroupRight key={index}>{rb}</GroupRight>;
          })}
        </FlexContainer>
      </HeaderContainer>
    );
  }
}

export default Header;
