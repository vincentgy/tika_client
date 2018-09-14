import React from 'react';
import {View} from 'react-native';
import {EasyTap} from '../../public/EasyTap';
import {EvilIcons} from '../Icons';

export default ({onPress, isClose}) => (
  <View
    style={{
      height: isClose ? 32 : 24,
      backgroundColor: 'white',
      borderTopLeftRadius: 32,
      borderTopRightRadius: 32,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    }}>
    <View
      style={{
        backgroundColor: '#abb0b0',
        height: 3,
        width: 48,
        borderRadius: 4,
      }}
    />
    {isClose ? (
      <EasyTap
        style={{position: 'absolute', right: 8, top: 2}}
        onPress={onPress}>
        <EvilIcons name="close" color="#abb0b0" size={20} />
      </EasyTap>
    ) : null}
  </View>
);
