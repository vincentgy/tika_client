import React from 'react';
import {Text, View} from 'react-native';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator,
} from 'react-navigation';
import {Page} from './components/PageHOC';
import {Ionicons} from './components/Icons';
import {Button} from '../node_modules/react-native-elements';

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
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Notification!</Text>
        <Button
          title="shit"
          onPress={() => {
            this.props.navigation.navigate('Shit');
          }}
        />
      </View>
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
  Tabs: TabRoot,
  Shit: Account,
  /* any other route you want to render above the tab bar */
});

export default createSwitchNavigator({
  HomeStack,
});
