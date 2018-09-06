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

const TabRoot = createBottomTabNavigator(
  {
    JobList,
    Chat,
    Account,
    // JobDetail,
    // EditProfile,
    // AboutMe,
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
});

export default createSwitchNavigator({
  HomeStack,
});
