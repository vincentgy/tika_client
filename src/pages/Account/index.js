import React from 'react';
import {View, StatusBar, Text, Image} from 'react-native';
import PageBase from '../../components/PageBase';
import {Page} from '../../components/PageHOC';
import styled from 'styled-components';
import {HEIGHT} from '../../utils/plaform';
import {Entypo} from '../../components/Icons';
import {Theme} from '../../utils/color';
import {IOSBar} from '../../components/StatusBar';

const ListGroup = ({children}) => {
  return <View style={{marginTop: 8}}>{children}</View>;
};
const ProfileContainer = styled.View`
  height: 200px;
  background-color: white;
  padding-top: 48px;
  padding-left: 16px;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
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

const Name = styled.Text`
  font-size: 18px;
  font-weight: 700;
`;

const ShortBref = styled.Text`
  color: #abb0b0;
  margin-top: 16px;
`;

const Bref = ({children}) => {
  let Child = children.length > 20 ? children.substr(0, 20) + '...' : children;
  return <ShortBref>{Child}</ShortBref>;
};

const Profile = () => {
  return (
    <ProfileContainer>
      <View>
        <Name>Zheng Fang</Name>
        <Bref>have 3 years background of web dev</Bref>
        <View style={{paddingTop: 8}}>
          <Text>Edit profile</Text>
        </View>
      </View>
      <Image
        source={require('./me.jpeg')}
        style={{width: 64, height: 64, marginRight: 16, borderRadius: 32}}
      />
    </ProfileContainer>
  );
};

class Account extends React.Component {
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
        <IOSBar barStyle={'dark-content'} color="white" />
        <Profile />
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

export default Page({
  tabBarIcon: ({focused}) => (
    <View style={{marginTop: 8}}>
      <Entypo name="user" size={24} color={focused ? Theme : '#abb0b0'} />
    </View>
  ),
  tabBarOnPress: ({defaultHandler}) => {
    defaultHandler();
    StatusBar.setBarStyle('dark-content', true);
  },
})(Account);
