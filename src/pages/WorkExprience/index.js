import React from 'react';
import {Text} from 'react-native';
import PageBase from '../../components/PageBase';
import Header from '../../components/Header';
import {EasyTap} from '../../public/EasyTap';
import {Entypo, MaterialIcons, FontAwesome} from '../../components/Icons';
import TimixForm from '../../components/TimixForm';
import {Put, getStore} from '../../store';
import {Kohana} from 'react-native-textinput-effects';
import DataPicker from '../../components/DataPicker';
import List from '../../components/List';
import TagInput from '../../components/TagInput';
import {NetworkManager} from '../../manager/networkManager';

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
  state = {jobTitle: '', company: '', start: ['01', 2017], end: ['01', 2017]};

  onFormChange = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  componentDidMount() {
    const type = getStore().profileEditType;
    if (type !== 'add') {
      const oneHist = getStore().profile.experiences[type];

      this.setState({
        jobTitle: oneHist.task,
        company: oneHist.place,
        start: this._ProcessDate(oneHist.start),
        end: this._ProcessDate(oneHist.end),
      });
    }
  }

  _ProcessDate = string => {
    return [string.substring(0, 2), string.substring(2, 6)];
  };

  FinisheEditing = () => {
    const type = getStore().profileEditType;
    const HistoryInfo = this.state;
    const NewInfo = {
      start: `${HistoryInfo.start[0]}${HistoryInfo.start[1]}`,
      end: `${HistoryInfo.end[0]}${HistoryInfo.end[1]}`,
      task: HistoryInfo.jobTitle,
      place: HistoryInfo.company,
      title: HistoryInfo.jobTitle,
    };

    if (type === 'add') {
      const manager = new NetworkManager();
      manager.addExprience(NewInfo);

      // Put(state => {
      //   state.profile.experiences.push(NewInfo);
      // });
    } else {
      Put(state => {
        state.profile.experiences[type] = NewInfo;
      });
    }

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
            value={this.state.jobTitle}
            onChangeText={text => this.onFormChange('jobTitle', text)}
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
            value={this.state.company}
            onChangeText={text => this.onFormChange('company', text)}
            autoCapitalize={'none'}
            autoCorrect={false}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: 48,
            }}
          />
          <DataPicker
            selectedMonth={this.state.start[0]}
            selectedYear={this.state.start[1]}
            onValueChange={(month, year) => {
              this.onFormChange('start', [month, year]);
            }}>
            {(setOpen, props, data) => (
              <List.Item
                onPress={setOpen}
                title="Start"
                desc={`${data[0]}/${data[1]}`}
              />
            )}
          </DataPicker>
          <DataPicker
            selectedMonth={this.state.end[0]}
            selectedYear={this.state.end[1]}
            onValueChange={(month, year) => {
              this.onFormChange('end', [month, year]);
            }}>
            {(setOpen, props, data) => (
              <List.Item
                onPress={setOpen}
                title="End"
                desc={`${data[0]}/${data[1]}`}
              />
            )}
          </DataPicker>
        </PageBase>
      </React.Fragment>
    );
  }
}
