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
      <KeyboardDetector
        Show={height => {
          this.view.transition(
            {marginTop: 0},
            {marginTop: -height / 2},
            500,
            false
          );
        }}
        Hide={() => {
          this.view.transitionTo({marginTop: 0});
        }}>
        {() => (
          <React.Fragment>
            <Header />
            <PageBase>
              <Animatable.View ref={Node => (this.view = Node)}>
                <ListTicker
                  data={Quali}
                  onChange={this.selectQuali}
                  currentActive={this.state.currentSelect}
                />
                <Input placeholder="Course" />
              </Animatable.View>
            </PageBase>
          </React.Fragment>
        )}
      </KeyboardDetector>
    );
  }
}
