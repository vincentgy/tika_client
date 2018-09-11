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
const Combind = TimixForm.Combind;

const EmploymentHistForm = Combind({
  JobInfo: TimixForm({
    JobTitle: Ft.Text,
    Company: Ft.Text,
  }),
  Time: {
    header: 'Employment Period',
    form: TimixForm({
      Start: Ft.Date,
      End: Ft.Date,
    }),
  },
  Skills: {
    header: 'Skills',
    form: TimixForm({
      Skills: Ft.Tags,
    }),
  },
});

const EmploymentHistory = TimixForm({
  JobTitle: Ft.Text,
  Company: Ft.Text,
  Start: Ft.Date,
  End: Ft.Date,
  Skills: Ft.Tags,
});

export default class WorkExprience extends React.Component {
  FinisheEditing = () => {
    const HistoryInfo = this.form.getFormData();
  };

  render() {
    return (
      <React.Fragment>
        <Header
          leftButton={[
            <EasyTap key={0} onPress={this.props.navigation.goBack}>
              <Entypo size={16} color="white" name="chevron-thin-left" />
            </EasyTap>,
          ]}
          rightButton={[
            <EasyTap key={1} onPress={this.FinisheEditing}>
              <MaterialIcons size={20} color="white" key={0} name="check" />
            </EasyTap>,
          ]}
          title={<Text style={{color: 'white'}}>Employment History</Text>}
        />
        <PageBase>
          <EmploymentHistForm ref={node => (this.form = node)} />
        </PageBase>
      </React.Fragment>
    );
  }
}
