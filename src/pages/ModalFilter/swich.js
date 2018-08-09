import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Entypo} from '../../components/Icons';
import styled from 'styled-components';
import * as Animatable from 'react-native-animatable';
import {WIDTH} from '../../utils/plaform';
import {Theme} from '../../utils/color';

export const FilterItem = props => (
  <TouchableOpacity
    {...props}
    style={{
      ...props.style,
      borderLeftWidth: 1,
      borderLeftColor: 'rgba(120,120,120,0.1)',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      height: 32,
    }}>
    <View>
      <Text style={{textAlign: 'center', fontSize: 10, color: props.fontColor}}>
        {props.children}
      </Text>
    </View>
    <Entypo
      size={8}
      name="chevron-thin-down"
      style={{marginLeft: 8}}
      color={props.fontColor}
    />
  </TouchableOpacity>
);

const RealFilter = styled.TouchableOpacity`
  height: 40px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(120, 120, 120, 0.1);
  background-color: white;
  flex-direction: row;
  align-items: center;
`;

export default class Switch extends React.Component {
  static defaultProps = {
    Item: [],
    visiable: false,
    active: '',
  };

  state = {
    activeIndex: 0,
  };

  getFilterView = node => (this.filter = node);

  componentDidMount() {
    const idx = this.props.Item.findIndex(item => item === this.props.active);
    if (idx) {
      this.setState({
        activeIndex: idx,
      });
    }
    const height = this.props.children[idx].props.h || 200;
    this.filter.transition({height: 0}, {height: height});
  }

  onSelect = idx => {
    if (this.state.activeIndex !== idx) {
      this.setState({
        activeIndex: idx,
      });
      const height = this.props.children[idx].props.h || 200;
      this.filter.transition({height: 0}, {height: height});
    }
  };

  render() {
    const {activeIndex} = this.state;

    return (
      <View>
        <RealFilter>
          {this.props.Item.map((item, index) => {
            return (
              <FilterItem
                onPress={() => this.onSelect(index)}
                key={index}
                fontColor={activeIndex === index ? Theme : 'black'}
                style={{width: WIDTH / this.props.Item.length}}>
                {item}
              </FilterItem>
            );
          })}
        </RealFilter>
        <Animatable.View
          ref={this.getFilterView}
          style={{
            backgroundColor: '#f8f8f8',
            width: WIDTH,
          }}>
          {this.props.children[activeIndex]}
        </Animatable.View>
      </View>
    );
  }
}
