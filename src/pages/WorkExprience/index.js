import React from 'react';
import {Text} from 'react-native';
import PageBase from '../../components/PageBase';
import Input from '../../components/Input';
import List from '../../components/List';
import Header from '../../components/Header';
import DataPicker from '../../components/DataPicker';
import {EasyTap} from '../../public/EasyTap';
import {Entypo} from '../../components/Icons';

export default class WorkExprience extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header
          leftButton={[
            <EasyTap key={0} onPress={() => this.props.navigation.goBack()}>
              <Entypo size={16} color="white" name="chevron-thin-left" />
            </EasyTap>,
          ]}
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
            <DataPicker key={1}>
              {setOpen => (
                <List.Item onPress={setOpen} title="Start" desc="8.2018" />
              )}
            </DataPicker>
            <DataPicker key={2}>
              {setOpen => (
                <List.Item onPress={setOpen} title="End" desc="8.2018" />
              )}
            </DataPicker>
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
