import React from 'react';
import {View, Text} from 'react-native';
import Header from '../../components/Header';
import List from '../../components/List';

export default class Location extends React.Component {
  render() {
    return (
      <View>
        <Header
          title={
            <View>
              <Header.LargeTitle>Create job: Location</Header.LargeTitle>
              <Header.Title>Step 4 of 4</Header.Title>
            </View>
          }
        />
        <List
          title={
            <Text style={{marginLeft: 16, marginTop: 16, color: '#abb0b0'}}>
              LOCATION
            </Text>
          }>
          <List.Item key={1} title="Region" />
          <List.Item key={2} title="Distrct" />
          <List.Item key={3} title="Address" />
        </List>
      </View>
    );
  }
}
