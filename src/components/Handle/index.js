import React from 'react';
import {View} from 'react-native';

export default () => (
  <View
    style={{
      height: 24,
      backgroundColor: 'white',
      borderTopLeftRadius: 32,
      borderTopRightRadius: 32,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <View
      style={{
        backgroundColor: '#abb0b0',
        height: 3,
        width: 48,
        borderRadius: 4,
      }}
    />
  </View>
);
