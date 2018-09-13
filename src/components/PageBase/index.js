import React from 'react';

import {View, ScrollView, Platform, Text} from 'react-native';
import {WIDTH, HEIGHT} from '../../utils/plaform';
import Header from '../Header';

class PageBase extends React.Component {
  static defaultProps = {
    update: true,
  };

  shouldComponentUpdate() {
    return this.props.update;
  }

  render() {
    const {
      hasStatusBar,
      hasHeader,
      headerTitle,
      HeaderLeftButton,
      HeaderRightButton,
    } = this.props;
    const Height =
      Platform.OS === 'ios'
        ? {
            height:
              HEIGHT - (Platform.OS === 'ios' ? (hasStatusBar ? 66 : 0) : 0),
          }
        : {};

    const _Header = hasHeader ? <Header title={headerTitle} /> : null;

    return (
      <View style={this.props.style}>
        {_Header}
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

PageBase.LargeTitle = ({children}) => (
  <Text style={{fontSize: 18, fontWeight: '700', color: 'white'}}>
    {children}
  </Text>
);
PageBase.Title = ({children}) => (
  <Text style={{color: 'white'}}>{children}</Text>
);

export default PageBase;
