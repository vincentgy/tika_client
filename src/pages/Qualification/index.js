import React from 'react';
import {Text} from 'react-native';
import PageBase from '../../components/PageBase';
import SelectItem from '../../public/SelectItem';
import Header from '../../components/Header';

import Input from '../../components/Input';
import KeyboardDetector from '../../utils/keyboard';
import * as Animatable from 'react-native-animatable';
import ListTicker from '../../components/ListTicker';
import {Entypo, FontAwesome} from '../../components/Icons';
import {EasyTap} from '../../public/EasyTap';

import {Kohana} from 'react-native-textinput-effects';
import DataPicker from '../../components/DataPicker';
import List from '../../components/List';

export default class QualificationEditor extends React.Component {
  state = {
    currentSelect: 'High school',
    start: ['Jan', 2017],
    end: ['Jan', 2017],
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
          title={<Text style={{color: 'white'}}>Qualification</Text>}
        />
        <PageBase>
          <Kohana
            inputStyle={{fontSize: 14}}
            useNativeDriver
            label="School"
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
          <Kohana
            inputStyle={{fontSize: 14}}
            useNativeDriver
            label="Major"
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
          <ListTicker
            currentActive={'Master'}
            onChange={data => this.onFormChange(key, data)}
            data={Quali}
          />
        </PageBase>
      </React.Fragment>
    );
  }
}
