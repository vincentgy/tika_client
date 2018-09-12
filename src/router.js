import React from 'react';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator,
} from 'react-navigation';

import JobList from './pages/JobList';
import Edit from './pages/PostJob/edit';
import Picker from './pages/PostJob/picker';
import Account from './pages/Account';
import SearchJob from './pages/Search';
import Description from './pages/PostJob/description';
import ResultList from './pages/Search/resultList';
import Chat from './pages/Chat';
import JobDetail from './pages/JobDetail';
import EditProfile from './pages/EditProfile';
import AboutMe from './pages/AboutMe';
import WorkExprience from './pages/WorkExprience';
import QualificationEditor from './pages/Qualification';
import Skills from './pages/Skills';
import {View} from 'react-native';
import PageBase from './components/PageBase';
import TimixForm from './components/TimixForm';
import {Button} from 'react-native-elements';
import WatchList from './pages/WatchList';

const TestForm = TimixForm({
  text: TimixForm.FormType.Text,
  zhengfang: TimixForm.FormType.Text,
  date: TimixForm.FormType.Date,
  tick: TimixForm.FormType.Tick,
  bool: TimixForm.FormType.Bool,
  tags: TimixForm.FormType.Tags,
});

class TimixFormTest extends React.Component {
  render() {
    return (
      <View>
        <PageBase>
          <TestForm ref={node => (this.form = node)} tick={['2', '3', '6']} />
          <Button
            title="确定"
            onPress={() => {
              console.log(this.form.getFormData());
            }}
          />
        </PageBase>
      </View>
    );
  }
}

const TabRoot = createBottomTabNavigator(
  {
    JobList,
    WatchList,
    Chat,
    Account,
    // JobDetail,
    // EditProfile,
    // AboutMe,
    // TimixFormTest,
  },
  {
    initialRouteName: 'Account',
    tabBarOptions: {
      style: {
        backgroundColor: 'white',
      },
    },
  }
);

const withoutHeader = page => {
  return {
    screen: page,
    navigationOptions: {
      header: null,
    },
  };
};
const HomeStack = createStackNavigator({
  Tabs: withoutHeader(TabRoot),
  Edit: withoutHeader(Edit),
  JobDetail: withoutHeader(JobDetail),
  Picker: Picker,
  SearchJob: withoutHeader(SearchJob),
  Description: withoutHeader(Description),
  SearchResult: withoutHeader(ResultList),
  EditProfile: withoutHeader(EditProfile),
  AboutMe: withoutHeader(AboutMe),
  WorkExprience: withoutHeader(WorkExprience),
  Qualification: withoutHeader(QualificationEditor),
  Skills: withoutHeader(Skills),
});

export default createSwitchNavigator({
  HomeStack,
});
