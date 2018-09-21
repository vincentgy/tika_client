import React from 'react';
import {Text} from 'react-native';
import PageBase from '../../components/PageBase';
import SelectItem from '../../public/SelectItem';
import Header from '../../components/Header';

import Input from '../../components/Input';
import KeyboardDetector from '../../utils/keyboard';
import * as Animatable from 'react-native-animatable';
import ListTicker from '../../components/ListTicker';
import {Entypo, FontAwesome, MaterialIcons} from '../../components/Icons';
import {EasyTap} from '../../public/EasyTap';

import {Kohana} from 'react-native-textinput-effects';
import DataPicker from '../../components/DataPicker';
import List from '../../components/List';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {getStore, Put} from '../../store';
import {NetworkManager} from '../../manager/networkManager';

export default class QualificationEditor extends React.Component {
  state = {
    start: ['01', 2017],
    end: ['01', 2017],
    degree: 'Bachelors',
    school: '',
    major: '',
  };

  selectQuali = name => {
    this.setState({
      currentSelect: name,
    });
  };

  onFormChange = (key, value) => {
    this.setState({
      [key]: value,
    });
  };
  _ProcessDate = string => {
    return [string.substring(0, 2), string.substring(2, 6)];
  };

  componentDidMount() {
    const type = getStore().qualificationEditType;

    if (type !== 'add') {
      const QualiInfo = getStore().profile.qualification[type];
      const NewInfo = {
        start: this._ProcessDate(QualiInfo.start),
        end: this._ProcessDate(QualiInfo.end),
        degree: QualiInfo.degree,
        school: QualiInfo.school,
        major: QualiInfo.major,
      };

      console.log(NewInfo);
      this.setState({...NewInfo});
    }
  }

  FinisheEditing = () => {
    const type = getStore().qualificationEditType;
    const QualiInfo = this.state;
    const NewInfo = {
      start: `${QualiInfo.start[0]}${QualiInfo.start[1]}`,
      end: `${QualiInfo.end[0]}${QualiInfo.end[1]}`,
      degree: QualiInfo.degree,
      school: QualiInfo.school,
      major: QualiInfo.major,
    };

    if (type === 'add') {
      Put(state => {
        state.profile.qualification.push(NewInfo);
      });
    } else {
      Put(state => {
        state.profile.qualification[type] = NewInfo;
      });
    }

    this.props.navigation.goBack();
  };

  render() {
    const Quali = [
      'High school',
      'Diploma',
      'Bachelors',
      'Bachelors with Honours',
      'Master',
      'Doctorate',
    ];

    return (
      <React.Fragment>
        <Header
          leftButton={[
            <EasyTap key={1} onPress={() => this.props.navigation.goBack()}>
              <Entypo
                size={16}
                color="white"
                key={0}
                name="chevron-thin-left"
              />
            </EasyTap>,
          ]}
          rightButton={[
            <EasyTap key={1} onPress={this.FinisheEditing}>
              <MaterialIcons size={20} color="white" key={0} name="check" />
            </EasyTap>,
          ]}
          title={<Text style={{color: 'white'}}>Qualification</Text>}
        />
        <KeyboardAwareScrollView>
          <ListTicker
            currentActive={this.state.degree}
            onChange={data => this.onFormChange('degree', data)}
            data={Quali}
          />
          <Kohana
            inputStyle={{fontSize: 14}}
            useNativeDriver
            label="School"
            labelStyle={{fontWeight: '100', fontSize: 14}}
            iconSize={14}
            iconClass={FontAwesome}
            iconName={'pencil'}
            // TextInput props
            value={this.state.school}
            onChangeText={text => this.onFormChange('school', text)}
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
            label="Major"
            labelStyle={{fontWeight: '100', fontSize: 14}}
            iconSize={14}
            iconClass={FontAwesome}
            iconName={'pencil'}
            // TextInput props
            value={this.state.major}
            onChangeText={text => this.onFormChange('major', text)}
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
        </KeyboardAwareScrollView>
      </React.Fragment>
    );
  }
}
