import React from 'react';
import {View, StatusBar} from 'react-native';
import PageBase from '../../components/PageBase';
import {Page} from '../../components/PageHOC';
import styled from 'styled-components';
import {HEIGHT} from '../../utils/plaform';
import {Entypo} from '../../components/Icons';
import {Theme} from '../../utils/color';

const ListGroup = ({children}) => {
  return <View style={{marginTop: 8}}>{children}</View>;
};
const ProfileContainer = styled.View`
  height: 200px;
  background-color: white;
`;

const Cell = styled.TouchableOpacity`
  background-color: white;
`;

const CellInside = styled.View`
  height: 56px;
  margin-left: 8px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(120, 120, 120, 0.1);
`;

// user

@Page({
  tabBarIcon: ({focused}) => (
    <View style={{marginTop: 8}}>
      <Entypo name="user" size={24} color={focused ? Theme : '#abb0b0'} />
    </View>
  ),
  tabBarOnPress: ({defaultHandler}) => {
    defaultHandler();
    StatusBar.setBarStyle('dark-content', true);
  },
})
export default class Account extends React.Component {
  state = {
    carMake: 'cadillac',
    modelIndex: 3,
  };
  render() {
    return (
      <PageBase
        style={{
          backgroundColor: '#f5f5f5',
          height: HEIGHT - 44,
        }}>
        <StatusBar barStyle="dark-content" />
        <ProfileContainer />
        <ListGroup>
          <Cell>
            <CellInside />
          </Cell>
          <Cell>
            <CellInside />
          </Cell>
          <Cell>
            <CellInside />
          </Cell>
        </ListGroup>
        <Cell>
          <CellInside />
        </Cell>
      </PageBase>
    );
  }
}
