import React from 'react';
import {Text} from 'react-native';

export const Title = ({text}) => {
  return (
    <Text
      style={{
        marginLeft: 16,
        marginTop: 16,
        marginBottom: 8,
        color: '#abb0b0',
      }}>
      {text}
    </Text>
  );
};
