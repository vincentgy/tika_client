import React from 'react';
import {ViewPagerAndroid, View, Text} from 'react-native';

class Tab extends React.Component {
  state = {
    position: 0,
    offset: 0,
  };

  render() {
    return (
      <ViewPagerAndroid style={styles.viewPager} initialPage={1}>
        <View style={styles.pageStyle} key="1">
          <Text>1</Text>
        </View>
        <View style={styles.pageStyle} key="2">
          <Text>2</Text>
        </View>
      </ViewPagerAndroid>
    );
  }
}

const styles = {
  viewPager: {
    flex: 1,
  },
  pageStyle: {
    alignItems: 'center',
    padding: 20,
  },
};

export default Tab;
