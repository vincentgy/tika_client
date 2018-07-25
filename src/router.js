import React from 'react';
import {Text, View} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation';
import {YellowBox} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Page} from './components/PageHOC';

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader',
]);

@Page({
  tabBarLabel: 'Notifications',
  tabBarIcon: () => <Icon name="rocket" size={30} color="#900" />,
  tabBarOnPress: ({defaultHandler}) => {
    //   Alert.alert('切换中');
    defaultHandler();
  },
})
class Notifications extends React.Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Home!</Text>
      </View>
    );
  }
}

@Page({tabBarLabel: 'Post a Job'})
class PostJob extends React.Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Settings!</Text>
      </View>
    );
  }
}
@Page({tabBarLabel: 'Find a Job'})
class FindJob extends React.Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Settings!</Text>
      </View>
    );
  }
}

@Page({tabBarLabel: 'My Account'})
class Account extends React.Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Settings!</Text>
      </View>
    );
  }
}

export default createBottomTabNavigator(
  {
    Notifications,
    PostJob,
    FindJob,
    Account,
  },
  {
    tabBarOptions: {
      style: {
        backgroundColor: 'white',
      },
    },
  }
);
