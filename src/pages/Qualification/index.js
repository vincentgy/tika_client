import React from 'react';
import {Text} from 'react-native';
import PageBase from '../../components/PageBase';
import SelectItem from '../../public/SelectItem';
import Header from '../../components/Header';
import {List} from 'react-native-elements';
import Input from '../../components/Input';
import KeyboardDetector from '../../utils/keyboard';
import * as Animatable from 'react-native-animatable';
import ListTicker from '../../components/ListTicker';
import {Entypo} from '../../components/Icons';
import {EasyTap} from '../../public/EasyTap';
import TimixForm from '../../components/TimixForm';

const Ft = TimixForm.FormType;

const QualificationForm = TimixForm({
  Qualification: Ft.Tick,
  Course: Ft.Text,
});

export default class QualificationEditor extends React.Component {
  state = {
    currentSelect: 'High school',
  };

  selectQuali = name => {
    this.setState({
      currentSelect: name,
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
          <QualificationForm Qualification={Quali} />
        </PageBase>
      </React.Fragment>
    );
  }
}
