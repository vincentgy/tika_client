import React from 'react';
import {ViewPagerAndroid, View, Text, TouchableOpacity} from 'react-native';
import styled from 'styled-components';
import {WIDTH} from '../../utils/plaform';

const FlexContainer = styled.View`
  flex-direction: row;
`;

const SmallLine = styled.View`
  height: 1px;
  width: ${props => props.width}px;
  background-color: black;
  position: absolute;
  bottom: 0;
`;

class Header extends React.Component {
  static defaultProps = {
    title: ['1', '2', '3', '4'],
  };

  render() {
    return (
      <FlexContainer>
        {this.props.title.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={{width: WIDTH / this.props.title.length}}>
              <Text style={{textAlign: 'center'}}>{item}</Text>
            </TouchableOpacity>
          );
        })}
        <SmallLine width={WIDTH / this.props.title.length} />
      </FlexContainer>
    );
  }
}

class Tab extends React.Component {
  state = {
    position: 0,
    offset: 0,
  };

  render() {
    return (
      <View style={{height: '100%'}}>
        <Header />
        <ViewPagerAndroid style={styles.viewPager}>
          <View style={styles.pageStyle} key="1">
            <Text>1</Text>
          </View>
          <View style={styles.pageStyle} key="2">
            <Text>2</Text>
          </View>
        </ViewPagerAndroid>
      </View>
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
