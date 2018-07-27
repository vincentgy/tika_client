import React from 'react';
import styled from 'styled-components';
import {View, TouchableNativeFeedback} from 'react-native';
import {Entypo} from '../Icons';

const List = ({children}) => {
  const Children = children instanceof Array ? children : [children];
  return (
    <View style={{backgroundColor: 'white', marginTop: 8}}>
      {Children.map((child, index) => {
        if (index !== 0) {
          return React.cloneElement(child, {
            style: {
              borderTopWidth: 1,
              borderTopColor: 'rgba(120, 120, 120, 0.2)',
            },
          });
        }
        return child;
      })}
    </View>
  );
};

const Padding16 = styled.View`
  padding: 16px 0px;
  background: white;
  margin: 0px 16px;
`;

const ItemContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const T = styled.Text`
  font-size: 16px;
`;

const TextMargined = T.extend`
  margin-right: 8px;
`;

const Item = ({title, desc, style, onPress}) => {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <Padding16 style={style}>
        <ItemContainer>
          <T>{title}</T>
          <ItemContainer>
            <TextMargined style={{color: '#2D59D9'}}>{desc}</TextMargined>
            <Entypo
              size={12}
              key={0}
              name="chevron-thin-right"
              color="#2D59D9"
            />
          </ItemContainer>
        </ItemContainer>
      </Padding16>
    </TouchableNativeFeedback>
  );
};

List.Item = Item;

export default List;
