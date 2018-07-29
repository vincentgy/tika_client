import React from 'react';
import Spinner from 'react-native-spinkit';
import {View} from 'react-native';
import {WIDTH} from '../../utils/plaform';

//https://github.com/maxs15/react-native-spinkit
//https://github.com/ybq/Android-SpinKit
export const Loading = () => (
  <View
    style={{
      width: WIDTH,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
    <Spinner size={60} color="#2D59D9" type="Pulse" />
  </View>
);
