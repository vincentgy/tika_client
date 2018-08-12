import React from 'react';
import {Text, View, ScrollView} from 'react-native';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator,
} from 'react-navigation';

import {Page} from './components/PageHOC';
import {Ionicons} from './components/Icons';
import Header from './components/Header';
import Tab from './components/Tabs';
import PostJob from './pages/PostJob';
import JobList from './pages/JobList';
import Edit from './pages/PostJob/edit';
import Picker from './pages/PostJob/picker';
import Account from './pages/Account';
import SearchJob from './pages/Search';
import {Theme} from './utils/color';
import Description from './pages/PostJob/description';
import ResultList from './pages/Search/resultList';

@Page({
  tabBarLabel: 'Notifications',
  tabBarIcon: ({focused}) => (
    <Ionicons
      name={focused ? 'ios-people' : 'ios-people-outline'}
      size={24}
      color={Theme}
    />
  ),
  tabBarOnPress: ({defaultHandler}) => {
    defaultHandler();
  },
})
class Notifications extends React.Component {
  render() {
    return (
      <View style={{backgroundColor: 'white', height: '100%'}}>
        <Header
          rightButton={[
            <Ionicons key={0} name="ios-people" size={24} color="#900" />,
          ]}
        />
        <ScrollView style={{backgroundColor: 'grey'}}>
          <Tab />
        </ScrollView>
      </View>
    );
  }
}

@Page({tabBarLabel: 'Find a Job'})
class FindJob extends React.Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Find a Job</Text>
      </View>
    );
  }
}

const TabRoot = createBottomTabNavigator(
  {
    Notifications,
    JobList,
    FindJob,
    Account,
    PostJob,
  },
  {
    initialRouteName: 'JobList',
    tabBarOptions: {
      style: {
        backgroundColor: 'white',
      },
    },
  }
);

const withoutHeader = page => {
  return {
    screen: page,
    navigationOptions: {
      header: null,
    },
  };
};
const HomeStack = createStackNavigator({
  Tabs: withoutHeader(TabRoot),
  Edit: withoutHeader(Edit),
  Picker: Picker,
  SearchJob: withoutHeader(SearchJob),
  Description: withoutHeader(Description),
  SearchResult: withoutHeader(ResultList),
});

export default createSwitchNavigator({
  HomeStack,
});
