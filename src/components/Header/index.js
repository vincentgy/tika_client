import React from 'react';
import styled from 'styled-components';
import {Platform, StatusBar, View} from 'react-native';
// import PropTypes from 'prop-types';

import {Theme} from '../../utils/color';
import LinearGradient from 'react-native-linear-gradient';
import {WIDTH} from '../../utils/plaform';

const IOSStatusBar = styled.View`
  height: 20px;
  background-color: #096dd9;
`;

const HeaderContainer = styled.View`
  height: 48px;
  background-color: #096dd9;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const FlexContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

class Header extends React.Component {
  static defaultProps = {
    rightButton: [],
    leftButton: [],
  };

  // <Entypo size={16} color="white" key={0} name="chevron-thin-left" onPress />

  render() {
    const {leftButton, rightButton, style, StatusBarStyle} = this.props;

    const Right =
      rightButton instanceof Array ? (
        rightButton.map((i, idx) => (
          <View
            key={idx}
            style={{
              position: 'absolute',
              top: Platform.OS === 'ios' ? 24 : 6,
              right: idx * 32,
            }}>
            {i}
          </View>
        ))
      ) : (
        <View
          style={{
            position: 'absolute',
            top: Platform.OS === 'ios' ? 24 : 6,
            right: 0,
          }}>
          {this.props.rightButton}
        </View>
      );

    return (
      <React.Fragment>
        {Platform.OS === 'ios' ? (
          <IOSStatusBar style={StatusBarStyle}>
            <StatusBar barStyle={'light-content'} />
          </IOSStatusBar>
        ) : (
          <StatusBar backgroundColor={Theme} />
        )}
        <View
          style={{
            position: 'absolute',
            top: Platform.OS === 'ios' ? 24 : 6,
            zIndex: 1000,
          }}>
          {this.props.leftButton}
        </View>
        <HeaderContainer>
          {this.props.children}
          {this.props.title}
        </HeaderContainer>
        {Right}
      </React.Fragment>
    );
  }
}

export default Header;
