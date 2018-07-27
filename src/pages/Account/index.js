import React from 'react';
import PageBase from '../../components/PageBase';
import {Page} from '../../components/PageHOC';
import styled from 'styled-components';
import {Image} from 'react-native';
import {WIDTH} from '../../utils/plaform';

const Container = styled.View``;
const ProfileContainer = styled.View`
  height: 300px;
  background-color: white;
`;

@Page({tabBarLabel: 'My Account'})
export default class Account extends React.Component {
  render() {
    return (
      <PageBase>
        {/* <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        /> */}
        <Container>
          <Image
            style={{
              width: WIDTH,
              height: 174,
            }}
            source={require('./temp.png')}
          />
          <Image
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              position: 'absolute',
              left: WIDTH / 2 - 50,
              top: 174 - 50,
              zIndex: 12,
              shadowOpacity: 0.75,
              shadowRadius: 5,
              shadowColor: 'red',
              shadowOffset: {height: 0, width: 0},
            }}
            source={require('./temp.png')}
          />
          <ProfileContainer />
        </Container>
      </PageBase>
    );
  }
}
