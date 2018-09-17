import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styled from 'styled-components';
import {Ionicons} from '../Icons';

const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

export class Stepper extends React.PureComponent {
  state = {
    number: 1,
  };

  componentDidUpdate() {
    if (this.props.onChange) {
      if (this.props.value !== this.state.number) {
        this.setState({
          number: this.props.value,
        });
      }
    }
  }

  static defaultProps = {
    unit: 'position',
    value: 1,
  };

  add = () => {
    this.setState(
      {
        number: this.state.number + 1,
      },
      () => {
        this.props.onChange && this.props.onChange(this.state.number);
      }
    );
  };

  sub = () => {
    if (this.state.number > 1)
      this.setState(
        {
          number: this.state.number - 1,
        },
        () => {
          this.props.onChange && this.props.onChange(this.state.number);
        }
      );
  };

  render() {
    return (
      <Container
        style={{
          paddingVertical: 8,
          paddingHorizontal: 16,
          backgroundColor: 'white',
          justifyContent: 'space-between',
        }}>
        <Container>
          <Text style={{color: '#abb0b0'}}>
            {this.props.onChange ? this.props.value : this.state.number}
          </Text>
          <Text style={{color: '#abb0b0'}}>{`   ${this.props.unit}`}</Text>
        </Container>
        <Container>
          <TouchableOpacity
            onPress={this.sub}
            style={{
              borderWidth: 0.5,
              borderColor: '#2f54eb',
              paddingHorizontal: 16,
              borderTopLeftRadius: 4,
              borderBottomLeftRadius: 4,
            }}>
            <Ionicons color="#2f54eb" name="ios-remove" size={24} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.add}
            style={{
              borderTopWidth: 0.5,
              borderColor: '#2f54eb',
              paddingHorizontal: 16,
              borderRightWidth: 0.5,
              borderBottomWidth: 0.5,
              borderTopRightRadius: 4,
              borderBottomRightRadius: 4,
            }}>
            <Ionicons color={'#2f54eb'} name="ios-add" size={24} />
          </TouchableOpacity>
        </Container>
      </Container>
    );
  }
}
