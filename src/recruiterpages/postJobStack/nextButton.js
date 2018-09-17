import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {WIDTH} from '../../utils/plaform';

export const NextBottom = ({navigation, goto, onPress, title = 'Next'}) => {
  return (
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
      <TouchableOpacity
        onPress={onPress ? onPress : () => navigation.navigate(goto)}
        style={{
          width: WIDTH,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          height: 48,
        }}>
        <Text style={{color: 'white'}}>{title}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};
