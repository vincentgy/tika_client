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

// @Page({
//   tabBarIcon: ({focused}) => (
//     <FontAwesome
//       name="comments"
//       size={24}
//       color={focused ? Theme : '#abb0b0'}
//     />
//   ),
//   tabBarOnPress: ({defaultHandler}) => {
//     defaultHandler();
//   },
// })
// class Chat extends React.Component {
//   render() {
//     return (
//       <View style={{backgroundColor: 'white', height: '100%'}}>
//         <Header />
//       </View>
//     );
//   }
// }

// @Page({tabBarLabel: 'Find a Job'})
// class FindJob extends React.Component {
//   render() {
//     return (
//       <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//         <Text>Find a Job</Text>
//       </View>
//     );
//   }
// }

const TabRoot = createBottomTabNavigator(
  {
    JobList,
    Chat,
    Account,
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
  Picker: Picker,
  SearchJob: withoutHeader(SearchJob),
  Description: withoutHeader(Description),
  SearchResult: withoutHeader(ResultList),
});

export default createSwitchNavigator({
  HomeStack,
});
