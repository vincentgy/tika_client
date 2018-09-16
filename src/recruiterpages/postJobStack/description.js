import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import TimixForm from '../../components/TimixForm';
import Header from '../../components/Header';
import LinearGradient from 'react-native-linear-gradient';
import {WIDTH} from '../../utils/plaform';
import {NextBottom} from './nextButton';

const DescriptionForm = TimixForm.Combind({
  JobDescription: {
    form: TimixForm({
      'Job Title': TimixForm.FormType.Text,
      Company: TimixForm.FormType.Text,
      'Job Description': TimixForm.FormType.Text,
    }),
    header: 'JOB DESCRIPTION',
  },
  'NUMBER OF POSITIONS': {
    form: TimixForm({
      Position: TimixForm.FormType.Step,
    }),
    header: 'NUMBER OF POSITIONS',
  },
});

export default class Description extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header
          title={
            <View>
              <Header.LargeTitle>Create job: Description</Header.LargeTitle>
              <Header.Title>Step 2 of 4</Header.Title>
            </View>
          }
        />
        <DescriptionForm />
        <NextBottom goto="JobType" {...this.props} />
      </React.Fragment>
    );
  }
}
