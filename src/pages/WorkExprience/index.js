import React from 'react';
import {Text} from 'react-native';
import PageBase from '../../components/PageBase';
import Input from '../../components/Input';
import List from '../../components/List';
import Header from '../../components/Header';
import DataPicker from '../../components/DataPicker';

export default class WorkExprience extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header
          title={<Text style={{color: 'white'}}>Employment History</Text>}
        />
        <PageBase>
          <Input key={1} placeholder="Job title" />
          <Input key={2} placeholder="Company" />
          <List
            title={
              <Text style={{marginTop: 16, marginLeft: 8, color: '#abb0b0'}}>
                Employment period
              </Text>
            }>
            <List.Item key={1} title="Start" desc="8.2018" />
            <List.Item key={2} title="End" desc="8.2018" />
          </List>
          <List>
            <List.Item key={1} title="Category" />
            <List.Item key={2} title="Skills" />
          </List>
        </PageBase>
      </React.Fragment>
    );
  }
}
