import React from 'react';
import {View} from 'react-native';
import {shadowStyle} from '../../public/shadowStyle';

/**
 * Body的外壳
 */
const Card = ({style, children}) => {
  return <View style={[shadowStyle, style]}>{children}</View>;
};

export default Card;
