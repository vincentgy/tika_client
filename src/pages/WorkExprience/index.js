import React from 'react';
import {Text} from 'react-native';
import PageBase from '../../components/PageBase';
import Header from '../../components/Header';
import {EasyTap} from '../../public/EasyTap';
import {Entypo, MaterialIcons, FontAwesome} from '../../components/Icons';
import TimixForm from '../../components/TimixForm';
import {Put} from '../../store';
import {Kohana} from 'react-native-textinput-effects';
import DataPicker from '../../components/DataPicker';
import List from '../../components/List';
import TagInput from '../../components/TagInput';

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
          <Kohana
            inputStyle={{fontSize: 14}}
            useNativeDriver
            label="Job Title"
            labelStyle={{fontWeight: '100', fontSize: 14}}
            iconSize={14}
            iconClass={FontAwesome}
            iconName={'pencil'}
            // TextInput props
            // value={this.state[key].value}
            // onChangeText={text => this.onFormChange(key, text)}
            autoCapitalize={'none'}
            autoCorrect={false}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: 48,
            }}
          />
          <Kohana
            inputStyle={{fontSize: 14}}
            useNativeDriver
            label="Company"
            labelStyle={{fontWeight: '100', fontSize: 14}}
            iconSize={14}
            iconClass={FontAwesome}
            iconName={'pencil'}
            // TextInput props
            // value={this.state[key].value}
            // onChangeText={text => this.onFormChange(key, text)}
            autoCapitalize={'none'}
            autoCorrect={false}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: 48,
            }}
          />
          <DataPicker
          // onComfirm={(month, year) => this.onFormChange(key, [month, year])}
          >
            {(setOpen, props, data) => (
              <List.Item
                onPress={setOpen}
                title="Start"
                desc={`${data[0]}/${data[1]}`}
              />
            )}
          </DataPicker>
          <DataPicker
          // onComfirm={(month, year) => this.onFormChange(key, [month, year])}
          >
            {(setOpen, props, data) => (
              <List.Item
                onPress={setOpen}
                title="End"
                desc={`${data[0]}/${data[1]}`}
              />
            )}
          </DataPicker>
          <TagInput placeholder="Skills" />
        </PageBase>
      </React.Fragment>
    );
  }
}
