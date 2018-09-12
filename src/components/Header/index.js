import React from 'react';

import {Platform, StatusBar, View} from 'react-native';
// import PropTypes from 'prop-types';

import {Theme} from '../../utils/color';
import LinearGradient from 'react-native-linear-gradient';

class Header extends React.Component {
  static defaultProps = {
    rightButton: [],
    leftButton: [],
  };

  // <Entypo size={16} color="white" key={0} name="chevron-thin-left" onPress />

  render() {
    const {rightButton, StatusBarStyle} = this.props;

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
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#597ef7', '#2f54eb']}
            style={{...StatusBarStyle, height: 20}}>
            <StatusBar barStyle={'light-content'} />
          </LinearGradient>
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
        <LinearGradient
          style={{
            height: 48,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#597ef7', '#2f54eb']}>
          {this.props.children}
          {this.props.title}
        </LinearGradient>
        {Right}
      </React.Fragment>
    );
  }
}

export default Header;
