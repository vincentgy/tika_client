//https://github.com/Flipkart/recyclerlistview/blob/21049cc89ad606ec9fe8ea045dc73732ff29eac9/src/core/RecyclerListView.tsx#L540-L634

/***
 Use this component inside your React Native Application.
 A scrollable list with different item type
 */
import React from 'react';
import {Text, View, StatusBar} from 'react-native';

import {EvilIcons, MaterialCommunityIcons} from '../../components/Icons';

import JobListTemplate, {Search} from '../../public/JobListPage';
import {Page} from '../../components/PageHOC';
import {Theme} from '../../utils/color';
import {Auto} from '../../store';

const JobList = Auto(state => state.job);

class JobListContainer extends React.Component {
  render() {
    return JobList(job => {
      return (
        <JobListTemplate
          onSelect={() => {
            this.props.navigation.navigate('JobDetail');
          }}
          title={
            <Text
              style={{fontSize: 18, fontWeight: '700', color: 'white'}}
              key="1">
              Find a job
            </Text>
          }
          list={job.list}
          loading={job.loading}
          rightButton={
            <Search
              key="1"
              onPress={() => this.props.navigation.navigate('SearchJob')}>
              <EvilIcons name="search" color="white" size={24} />
            </Search>
          }
        />
      );
    });
  }
}

export default Page({
  tabBarIcon: ({focused}) => (
    <View style={{marginTop: 8}}>
      <MaterialCommunityIcons
        name="clipboard-text"
        size={24}
        color={focused ? Theme : '#abb0b0'}
      />
    </View>
  ),
  tabBarOnPress: ({defaultHandler}) => {
    defaultHandler();
    StatusBar.setBarStyle('light-content', true);
  },
})(JobListContainer);
