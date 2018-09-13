//https://github.com/Flipkart/recyclerlistview/blob/21049cc89ad606ec9fe8ea045dc73732ff29eac9/src/core/RecyclerListView.tsx#L540-L634

/***
 Use this component inside your React Native Application.
 A scrollable list with different item type
 */
import React from 'react';
import {Text, View, StatusBar} from 'react-native';

import {FontAwesome} from '../../components/Icons';

import {Page} from '../../components/PageHOC';
import {Theme} from '../../utils/color';
import {Auto} from '../../store';
import PageBase from '../../components/PageBase';

class JobListContainer extends React.Component {
  render() {
    return (
      <PageBase
        headerTitle={<PageBase.LargeTitle>WatchList</PageBase.LargeTitle>}
        hasHeader
      />
    );
  }
}

export default Page({
  tabBarIcon: ({focused}) => (
    <View style={{marginTop: 4}}>
      <FontAwesome name="star" size={24} color={focused ? Theme : '#abb0b0'} />
    </View>
  ),
  tabBarOnPress: ({defaultHandler}) => {
    defaultHandler();
    StatusBar.setBarStyle('light-content', true);
  },
})(JobListContainer);
