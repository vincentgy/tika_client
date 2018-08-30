import React from 'react';
import styled from 'styled-components';
import {Platform, StatusBar, View} from 'react-native';
// import PropTypes from 'prop-types';

import {Theme} from '../../utils/color';
import LinearGradient from 'react-native-linear-gradient';
import {WIDTH} from '../../utils/plaform';

const IOSStatusBar = styled.View`
  height: 20px;
  background-color: white;
`;

const HeaderContainer = styled.View`
  height: 48px;
  background-color: white;
  flex-direction: row;
  justify-content: space-between;
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

    return (
      <React.Fragment>
        {Platform.OS === 'ios' ? (
          <IOSStatusBar style={StatusBarStyle}>
            <StatusBar barStyle={'dark-content'} />
          </IOSStatusBar>
        ) : (
          <StatusBar backgroundColor={Theme} />
        )}
        <LinearGradient
          style={{
            height: 48,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#6f86d6', '#667eea']}>
          {this.props.title}
        </LinearGradient>
      </React.Fragment>
    );
  }
}

export default Header;
