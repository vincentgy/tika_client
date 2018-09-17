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
      <View style={{backgroundColor: 'white', marginTop: 8}}>{children}</View>
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

const Item = ({title, desc, style, onPress, disable}) => {
  if (disable) return <View />;
  return (
    <View style={style}>
      <TouchableOpacity onPress={onPress}>
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
      </TouchableOpacity>
    </View>
  );
};

List.Item = Item;

export default List;
