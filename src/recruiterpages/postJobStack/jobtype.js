import React from 'react';
import TimixForm from '../../components/TimixForm';
import Header from '../../components/Header';
import {View} from 'react-native';
import {NextBottom} from './nextButton';

const JobTypeForm = TimixForm.Combind({
  JobType: {
    form: TimixForm({
      JobType: TimixForm.FormType.Tick,
    }),
    header: 'JOB TYPE',
  },
});

export default class JobType extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header
          title={
            <View>
              <Header.LargeTitle>Create job: Job Type</Header.LargeTitle>
              <Header.Title>Step 3 of 4</Header.Title>
            </View>
          }
        />
        <JobTypeForm
          JobType={['Full time', 'Part time', 'Contract', 'One off']}
        />
        <NextBottom goto="Location" {...this.props} />
      </React.Fragment>
    );
  }
}
