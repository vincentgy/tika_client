import React from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-elements';
import {connect} from 'react-redux';
import {Page} from '../../components/PageHOC';
import {Entypo} from '../../components/Icons';
import {Theme} from '../../utils/color';
import Header from '../../components/Header';

@connect()
class Account extends React.Component {
  gotoSeeker = () => {
    this.props.dispatch({type: 'gotoSeeker'});
  };

  render() {
    return (
      <View>
        <Header />
        <Button title="go to seeker" onPress={this.gotoSeeker} />
      </View>
    );
  }
}

export default Page({
  tabBarIcon: ({focused}) => (
    <View style={{marginTop: 8}}>
      <Entypo name="user" size={24} color={focused ? Theme : '#abb0b0'} />
    </View>
  ),
  tabBarOnPress: ({defaultHandler}) => {
    defaultHandler();
    StatusBar.setBarStyle('dark-content', true);
  },
  tabBarLabel: 'Account',
})(Account);
