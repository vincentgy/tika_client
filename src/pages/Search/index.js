import React from 'react';
import {View, Text, TextInput} from 'react-native';
import Header from '../../components/Header';
import styled from 'styled-components';
import {Theme} from '../../utils/color';
import {WithGoback} from '../../utils/withGoback';

const Cancel = styled.TouchableOpacity`
  height: 40px;
  width: 60px;
  justify-content: center;
  flex-direction: row;
  align-items: center;
`;

@WithGoback
export default class SearchJob extends React.Component {
  render() {
    return (
      <View>
        <Header
          leftButton={[]}
          rightButton={[
            <Cancel key={1} onPress={this.props.goback}>
              <Text style={{color: 'white'}}>取消</Text>
            </Cancel>,
          ]}
          title={
            <View
              style={{
                backgroundColor: 'white',
                width: '75%',
                borderRadius: 100,
                height: 32,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  marginLeft: 16,
                  fontSize: 12,
                  paddingRight: 8,
                  borderRightWidth: 1,
                  borderRightColor: 'rgba(120,120,120,0.1)',
                }}>
                Auckland
              </Text>
              <View style={{width: '70%', height: 38, paddingLeft: 6}}>
                <TextInput
                  autoFocus
                  selectionColor={Theme}
                  style={{fontSize: 12, height: 40}}
                  placeholder="job title or company"
                  underlineColorAndroid="transparent"
                  placeholderTextColor={'rgba(120,120,120,0.4)'}
                />
              </View>
            </View>
          }
        />
      </View>
    );
  }
}
