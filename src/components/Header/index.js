import React from 'react';

import {Platform, StatusBar, View, Text} from 'react-native';
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
              top: 24,
              right: idx * 32,
            }}>
            {i}
          </View>
        ))
      ) : (
        <View
          style={{
            position: 'absolute',
            top: 24,
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
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#597ef7', '#2f54eb']}
            style={{...StatusBarStyle, height: 20}}>
            <StatusBar translucent={true} backgroundColor="transparent" />
          </LinearGradient>
        )}
        <View
          style={{
            position: 'absolute',
            top: 24,
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

Header.LargeTitle = ({children}) => (
  <Text style={{fontSize: 18, fontWeight: '700', color: 'white'}}>
    {children}
  </Text>
);
Header.Title = ({children}) => (
  <Text style={{color: 'white', textAlign: 'center'}}>{children}</Text>
);

export default Header;
