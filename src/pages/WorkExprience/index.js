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
import TimixForm from '../../components/TimixForm';

const ListPicker = ({title, onComfirm}) => (
  <DataPicker>
    {setOpen => (
      <List.Item onComfirm={onComfirm} onPress={setOpen} title={title} />
    )}
  </DataPicker>
);

const Ft = TimixForm.FormType;

const EmploymentHistory = TimixForm({
  JobTitle: Ft.Text,
  Company: Ft.Text,
  Start: Ft.Date,
  End: Ft.Date,
  Skills: Ft.Tags,
});

export default class WorkExprience extends React.Component {
  onTimeChange = (type, month, year) => {};

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
          <EmploymentHistory />
        </PageBase>
      </React.Fragment>
    );
  }
}
