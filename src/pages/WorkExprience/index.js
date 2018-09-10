import React from 'react';
import {Text} from 'react-native';
import PageBase from '../../components/PageBase';
import Input from '../../components/Input';
import List from '../../components/List';
import Header from '../../components/Header';
import DataPicker from '../../components/DataPicker';
import {EasyTap} from '../../public/EasyTap';
import {Entypo, MaterialIcons} from '../../components/Icons';
import TagInput from '../../components/TagInput';

const ListPicker = ({title, onComfirm}) => (
  <DataPicker>
    {setOpen => (
      <List.Item onComfirm={onComfirm} onPress={setOpen} title={title} />
    )}
  </DataPicker>
);

export default class WorkExprience extends React.Component {
  onTimeChange = (type, month, year) => {};

  onShow = height => {
    this.page.transition({marginTop: 0}, {marginTop: -height});
  };
  onHide = () => {
    this.page.transitionTo({marginTop: 0});
  };

  render() {
    return (
      <React.Fragment>
        <Header
          leftButton={[
            <EasyTap key={0} onPress={() => this.props.navigation.goBack()}>
              <Entypo size={16} color="white" name="chevron-thin-left" />
            </EasyTap>,
          ]}
          rightButton={[
            <EasyTap key={1} onPress={() => this.props.navigation.goBack()}>
              <MaterialIcons size={20} color="white" key={0} name="check" />
            </EasyTap>,
          ]}
          title={<Text style={{color: 'white'}}>Employment History</Text>}
        />
        <PageBase>
          <Input placeholder="Job title" />
          <Input placeholder="Company" />
          <List
            title={
              <Text style={{marginTop: 16, marginLeft: 8, color: '#abb0b0'}}>
                Skills
              </Text>
            }>
            <TagInput />
          </List>
          <List
            title={
              <Text style={{marginTop: 16, marginLeft: 8, color: '#abb0b0'}}>
                Employment period
              </Text>
            }>
            <ListPicker
              onComfirm={(month, year) =>
                this.onTimeChange('start', month, year)
              }
              key={1}
              title="Start"
            />
            <ListPicker
              onComfirm={(month, year) => this.onTimeChange('end', month, year)}
              key={2}
              title="End"
            />
          </List>
          <List>
            <List.Item key={1} title="Category" />
          </List>
        </PageBase>
      </React.Fragment>
    );
  }
}
