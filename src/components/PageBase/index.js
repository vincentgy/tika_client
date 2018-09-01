import React from 'react';

import {View, ScrollView, Platform} from 'react-native';
import {WIDTH, HEIGHT} from '../../utils/plaform';

class PageBase extends React.Component {
  static defaultProps = {
    update: true,
  };

  shouldComponentUpdate() {
    return this.props.update;
  }

  render() {
    const {hasStatusBar} = this.props;
    console.log('shuaxin');
    const Height =
      Platform.OS === 'ios'
        ? {
            height:
              HEIGHT - (Platform.OS === 'ios' ? (hasStatusBar ? 66 : 0) : 0),
          }
        : {};

    return (
      <View style={this.props.style}>
        <ScrollView
          scrollEventThrottle={32}
          onScroll={this.props.onScroll}
          contentContainerStyle={{...this.props.containerStyle}}
          style={{
            ...Height,
            width: WIDTH,
            marginTop: Platform.OS === 'ios' ? (hasStatusBar ? 20 : 0) : 0,
          }}>
          {this.props.children}
        </ScrollView>
        {this.props.bar}
      </View>
    );
  }
}

export default PageBase;
