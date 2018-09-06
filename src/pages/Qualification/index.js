import React from 'react';
import {View, Text} from 'react-native';
import PageBase from '../../components/PageBase';
import SelectItem from '../../public/SelectItem';
import Header from '../../components/Header';
import {List} from 'react-native-elements';
import Input from '../../components/Input';

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
      </React.Fragment>
    );
  }
}
