import React from 'react';

import {View, ScrollView, Platform} from 'react-native';
import {WIDTH, HEIGHT} from '../../utils/plaform';

class PageBase extends React.Component {
  render() {
    const {hasStatusBar} = this.props;

    const Height =
      Platform.OS === 'ios'
        ? {
            height:
              HEIGHT - (Platform.OS === 'ios' ? (hasStatusBar ? 66 : 0) : 0),
          }
        : {};

    return (
      <View>
        <ScrollView
          style={{
            ...Height,
            width: WIDTH,
            marginTop: Platform.OS === 'ios' ? (hasStatusBar ? 20 : 0) : 0,
          }}>
          {this.props.children}
        </ScrollView>
      </View>
    );
  }
}

export default PageBase;
