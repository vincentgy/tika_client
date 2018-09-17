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
import ResultList from './pages/Search/resultList';
import Chat from './pages/ChatList';
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
import ChatScreen from './pages/ChatScreen';
// 雇佣者
import RecruiterAccount from './recruiterpages/account';
import PostJobList from './recruiterpages/postJobList';
import CreateCategory from './recruiterpages/postJobStack/createCate';
import Description from './recruiterpages/postJobStack/description';
import JobType from './recruiterpages/postJobStack/jobtype';
import _Location from './recruiterpages/postJobStack/location';

const TestForm = TimixForm({
  text: TimixForm.FormType.Text,
  zhengfang: TimixForm.FormType.Text,
  date: TimixForm.FormType.Date,
  tick: TimixForm.FormType.Tick,
  bool: TimixForm.FormType.Bool,
  tags: TimixForm.FormType.Tags,
  cate: TimixForm.FormType.Cate,
  position: TimixForm.FormType.Step,
  muilt: TimixForm.FormType.MuiltText,
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
    initialRouteName: 'JobList',
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
  ChatScreen: withoutHeader(ChatScreen),
  Edit: withoutHeader(Edit),
  JobDetail: withoutHeader(JobDetail),
  Picker: Picker,
  SearchJob: withoutHeader(SearchJob),
  SearchResult: withoutHeader(ResultList),
  EditProfile: withoutHeader(EditProfile),
  AboutMe: withoutHeader(AboutMe),
  WorkExprience: withoutHeader(WorkExprience),
  Qualification: withoutHeader(QualificationEditor),
  Skills: withoutHeader(Skills),
});

/**
 * 从这边起就是 recruiter 端
 */
const RecruiterTabRoot = createBottomTabNavigator(
  {
    RecruiterAccount,
    PostJobList,
  },
  {
    initialRouteName: 'PostJobList',
    tabBarOptions: {
      style: {
        backgroundColor: 'white',
      },
    },
  }
);

const RecruiterHome = createStackNavigator({
  RecruiterTabRoot: withoutHeader(RecruiterTabRoot),
  CreateCategory: withoutHeader(CreateCategory),
  Description: withoutHeader(Description),
  JobType: withoutHeader(JobType),
  Location: withoutHeader(_Location),
});

// 雇佣者的 app
export const RecruiterApp = createSwitchNavigator({
  RecruiterHome,
});

// 查询者的 app
export const SeekerApp = createSwitchNavigator({
  HomeStack,
});
