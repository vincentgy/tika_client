import React from 'react';
import {Text} from 'react-native';
import PageBase from '../../components/PageBase';
import Header from '../../components/Header';
import {EasyTap} from '../../public/EasyTap';
import {Entypo, MaterialIcons} from '../../components/Icons';
import TimixForm from '../../components/TimixForm';
import {Put} from '../../store';

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

export default class WorkExprience extends React.Component {
  FinisheEditing = () => {
    const HistoryInfo = this.form.getFormData();
    console.log(HistoryInfo);
    Put(state => {
      state.profile.experiences.push({
        start: `${HistoryInfo.Start[0]} ${HistoryInfo.Start[1]}`,
        end: `${HistoryInfo.End[0]} ${HistoryInfo.End[1]}`,
        task: HistoryInfo.JobTitle,
        place: HistoryInfo.Company,
      });
    });
    this.props.navigation.goBack();
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
