import React from 'react';
import {Text, View} from 'react-native';
import PageBase from '../../components/PageBase';
import Header from '../../components/Header';
import styled from 'styled-components';

const DetailContainer = styled.View`
  border-radius: 4px;
  border-width: 0.5px;
  border-color: rgba(120, 120, 120, 0.1);
  background-color: white;
  margin-left: 16px;
  margin-right: 16px;
  min-height: 200px;
`;

const Detail = () => {
  return (
    <DetailContainer
      style={{
        shadowColor: '#abb0b0',
        shadowOffset: {h: 16, w: 16},
        shadowRadius: 8,
        shadowOpacity: 0.2,
      }}
    />
  );
};

const Section = ({title}) => {
  return (
    <View
      style={{
        padding: 16,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <Text style={{fontSize: 18}}>{title}</Text>
      <View
        style={{
          borderTopColor: 'rgba(120,120,120,0.1)',
          borderTopWidth: 0.5,
          width: '65%',
        }}
      />
    </View>
  );
};

export default class JobDetail extends React.Component {
  render() {
    return (
      <PageBase style={{backgroundColor: 'white'}}>
        <Header />
        <Detail />
        <Section title="Description" />
      </PageBase>
    );
  }
}
