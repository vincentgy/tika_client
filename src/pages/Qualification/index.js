import React from 'react';
import {Text} from 'react-native';
import PageBase from '../../components/PageBase';
import SelectItem from '../../public/SelectItem';
import Header from '../../components/Header';
import {List} from 'react-native-elements';
import Input from '../../components/Input';
import KeyboardDetector from '../../utils/keyboard';
import * as Animatable from 'react-native-animatable';

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
          this.view.transition({marginTop: 0}, {marginTop: -height / 2},700,false);
        }}
        Hide={() => {
          this.view.transitionTo({marginTop: 0});
        }}>
        {() => (
          <Animatable.View ref={Node => (this.view = Node)}>
            <Header />
            <PageBase>
              <List>
                {Quali.map((data, idx) => (
                  <SelectItem
                    onPress={() => this.selectQuali(data)}
                    active={this.state.currentSelect === data}
                    key={idx}>
                    <Text>{data}</Text>
                  </SelectItem>
                ))}
              </List>
              <Input placeholder="Course" />
            </PageBase>
          </Animatable.View>
        )}
      </KeyboardDetector>
    );
  }
}
