import React from 'react';
import {Text, View, ScrollView, StatusBar} from 'react-native';
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
import Edit from './pages/PostJob/edit';
import Picker from './pages/PostJob/picker';
import Account from './pages/Account';

@Page({
  tabBarLabel: 'Notifications',
  tabBarIcon: ({focused}) => (
    <Ionicons
      name={focused ? 'ios-people' : 'ios-people-outline'}
      size={24}
      color="#900"
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
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Header
          rightButton={[
            <Ionicons key={0} name="ios-people" size={24} color="#900" />,
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
    PostJob,
    FindJob,
    Account,
  },
  {
    initialRouteName: 'PostJob',
    tabBarOptions: {
      style: {
        backgroundColor: 'white',
      },
    },
  }
);
const HomeStack = createStackNavigator({
  Tabs: {
    screen: TabRoot,
    navigationOptions: {
      header: null,
    },
  },
  Edit: {
    screen: Edit,
    navigationOptions: {
      header: null,
    },
  },
  Picker: Picker,
});

export default createSwitchNavigator({
  HomeStack,
});
