import React from 'react';
import {View, ScrollView, Platform} from 'react-native';
import {Page} from '../../components/PageHOC';
import {WIDTH} from '../../utils/plaform';
import List from '../../components/List';
import {Button} from 'react-native-elements';

const Item = List.Item;

@Page({tabBarLabel: 'Post a Job'})
export default class PostJob extends React.Component {
  render() {
    return (
      <View>
        <ScrollView
          style={{
            height: '100%',
            width: WIDTH,
            marginTop: Platform.OS === 'ios' ? 20 : 0,
          }}>
          <List>
            <Item key="1" title="Company" desc="Edit" />
          </List>
          <List>
            <Item key="1" title="Job Type" desc="Choose" />
            <Item key="2" title="Job Title" desc="Edit" />
            <Item key="3" title="Categories" desc="Choose" />
          </List>
          <List>
            <Item key="1" title="Region" desc="Choose" />
            <Item key="2" title="District" desc="Choose" />
            <Item key="3" title="Location" desc="Edit" />
          </List>
          <List>
            <Item key="1" title="Pay Type" desc="Choose" />
            <Item key="2" title="Pay Range" desc="Choose" />
          </List>
          <View style={{marginTop: 8, marginBottom: 8}}>
            <Button title="Post a job" backgroundColor="#2D59D9" />
          </View>
        </ScrollView>
      </View>
    );
  }
}
