import React from 'react';
import {Text, View, StatusBar} from 'react-native';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator,
} from 'react-navigation';
import {Page} from './components/PageHOC';
import {Ionicons} from './components/Icons';
import Header from './components/Header';
import Tab from './components/Tabs';

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
      <React.Fragment>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Header
          rightButton={[
            <Ionicons key={0} name="ios-people" size={24} color="#900" />,
            <Ionicons key={0} name="ios-people" size={24} color="#900" />,
          ]}
        />
        <Tab />
      </React.Fragment>
    );
  }
}

@Page({tabBarLabel: 'Post a Job'})
class PostJob extends React.Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Post a Job</Text>
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

@Page({tabBarLabel: 'My Account'})
class Account extends React.Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>My Account</Text>
      </View>
    );
  }
}

const TabRoot = createBottomTabNavigator(
  {
    Notifications,
    PostJob,
    FindJob,
  },
  {
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
  Shit: Account,
  /* any other route you want to render above the tab bar */
});

export default createSwitchNavigator({
  HomeStack,
});
