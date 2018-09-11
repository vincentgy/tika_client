import React from 'react';
import styled from 'styled-components';
import {
  View,
  TouchableNativeFeedback,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {Entypo} from '../Icons';

const List = ({title, children}) => {
  const Children = children instanceof Array ? children : [children];
  return (
    <React.Fragment>
      {title}
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
    </React.Fragment>
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
  color: #abb0b0;
`;

const TextMargined = T.extend`
  margin-right: 8px;
`;

const Item = ({title, desc, style, onPress}) => {
  const PlaformView =
    Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback;

  return (
    <View style={style}>
      <PlaformView onPress={onPress}>
        <Padding16>
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
      </PlaformView>
    </View>
  );
};

List.Item = Item;

export default List;
