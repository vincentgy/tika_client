import React from 'react';

import {View, ScrollView, Platform} from 'react-native';
import {WIDTH} from '../../utils/plaform';

class PageBase extends React.Component {
  render() {
    const {hasStatusBar} = this.props;

    return (
      <View>
        <ScrollView
          style={{
            height: '100%',
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
