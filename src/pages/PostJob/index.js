import React from 'react';
import {View, ScrollView} from 'react-native';
import {Page} from '../../components/PageHOC';
import {WIDTH} from '../../utils/plaform';
import List from '../../components/List';
import {Button} from 'react-native-elements';

const Item = List.Item;

@Page({tabBarLabel: 'Post a Job'})
export default class PostJob extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ScrollView style={{height: '100%', width: WIDTH, marginTop: 20}}>
          <List>
            <Item key="1" title="Company" desc="WestWorld" />
          </List>
          <List>
            <Item key="1" title="Job Type" desc="Choose" />
            <Item key="2" title="Job Title" desc="Choose" />
            <Item key="3" title="Categories" desc="Choose" />
          </List>
          <List>
            <Item key="1" title="Region" desc="Choose" />
            <Item key="2" title="District" desc="Choose" />
            <Item key="3" title="Location" desc="Choose" />
          </List>
          <List>
            <Item key="1" title="Pay Type" desc="Choose" />
            <Item key="2" title="Pay Range" desc="Choose" />
          </List>
          <Button
            title="Post a job"
            backgroundColor="#2D59D9"
            style={{marginTop: 8, marginBottom: 8}}
          />
        </ScrollView>
      </View>
    );
  }
}
