import React from 'react';
import {
  View,
  StatusBar,
  Text,
  Image,
  TouchableOpacity,
  AsyncStorage,
  Alert,
  ScrollView,
  StyleSheet,
} from 'react-native';
import PageBase from '../../components/PageBase';
import {Page} from '../../components/PageHOC';
import styled from 'styled-components';
import {HEIGHT, WIDTH} from '../../utils/plaform';
import {Entypo} from '../../components/Icons';
import {Theme} from '../../utils/color';
import {IOSBar} from '../../components/StatusBar';
import {connect} from 'react-redux';
import {FetcherNoCache} from '../../components/CreateFetcher';
import userManager from '../../manager/userManager';
import ImagePicker from 'react-native-image-crop-picker';
import LocationSelector from '../ModalFilter/location';
import ActionSheet from 'react-native-actionsheet'; //https://github.com/beefe/react-native-actionsheet
import MapView from 'react-native-maps';
import {NetworkManager} from '../../manager/networkManager';
import {Put, Auto} from '../../store';
import Container from '../../public/InformationContainer';
import UserImage from '../../public/UserImage';
import DropdownAlert from 'react-native-dropdownalert';

const Info = Container.Info;

const ListGroup = ({children}) => {
  return <View style={{marginTop: 8}}>{children}</View>;
};
const ProfileContainer = styled.View`
  background-color: white;
  padding-top: 48px;
  padding-left: 16px;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;

const Cell = styled.TouchableOpacity`
  background-color: white;
`;

const CellInside = styled.View`
  height: 56px;
  margin-left: 16px;
  border-bottom-width: ${props => (props.no ? 0 : 0.5)};
  border-bottom-color: ${props =>
    props.no ? 'transparent' : `rgba(120, 120, 120, 0.1)`};
  flex-direction: row;
  align-items: center;
`;

const Name = styled.Text`
  font-size: 18px;
  font-weight: 700;
`;

const ShortBref = styled.Text`
  color: #abb0b0;
  margin-top: 16px;
`;

const Bref = ({children}) => {
  let Child = children.length > 20 ? children.substr(0, 20) + '...' : children;
  return <ShortBref>{Child}</ShortBref>;
};

const SettingCell = ({children, no, onPress}) => {
  return (
    <Cell onPress={onPress} activeOpacity={1}>
      <CellInside no={no}>{children}</CellInside>
    </Cell>
  );
};

const Profile = ({
  onEditProfile,
  onAatarPress,
  aboutMe,
  name,
  avatar,
  dropdown,
}) => {
  return (
    <View style={{backgroundColor: 'white'}}>
      <ProfileContainer>
        <View>
          <Name>{name}</Name>
          <Bref>{aboutMe}</Bref>
          <TouchableOpacity
            onPress={onEditProfile}
            activeOpacity={1}
            style={{
              marginTop: 8,
              maxWidth: 110,
              padding: 4,
              flexDirection: 'row',
              borderRadius: 4,
              backgroundColor: 'rgba(120,120,120,0.1)',
            }}>
            <Entypo name="edit" size={16} color="#abb0b0" />
            <Text style={{color: '#abb0b0', paddingLeft: 8}}>Edit profile</Text>
          </TouchableOpacity>
        </View>
        {avatar ? <UserImage dropdown={dropdown} uri={avatar} /> : null}
      </ProfileContainer>
      <Container style={{margin: 16}}>
        <Info
          title="Applications"
          info="0"
          img={require('../../asset/resume.png')}
        />
        <Info
          title="Completed"
          info="0"
          img={require('../../asset/resume.png')}
        />
        <Info
          title="Interview"
          info="0"
          img={require('../../asset/interview.png')}
        />
      </Container>
    </View>
  );
};

const ProfileStore = Auto(state => ({
  name: state.profile.name,
  aboutMe: state.profile.aboutMe,
  avatar: state.profile.avatar,
}));

@connect()
class Account extends React.Component {
  async logout() {
    await AsyncStorage.removeItem('token');
    this.props.dispatch({type: 'checkLogin'});
  }

  handleLogout = () => {
    Alert.alert('Log out', 'Do you really want to log out this account?', [
      {text: 'No', style: 'cancel', onPress: () => {}},
      {
        text: 'Yes',
        onPress: () => {
          this.logout();
        },
      },
    ]);
  };

  handleEditProfile = () => {
    this.props.navigation.navigate('EditProfile');
  };

  async getUserProfile() {
    const manager = new NetworkManager();
    const profile = await manager.getProfile();
    Put(state => {
      state.profile.name = profile.name;
      state.profile.avatar = profile.avatar;
      state.profile.skills = profile.skills.split(',');
      state.profile.experiences = profile.experiences;
      state.profile.qualification = profile.qualifications;
      state.profile.aboutMe = profile.description;
    });
  }

  componentDidMount() {
    this.getUserProfile();
  }

  goToRecruter = () => {
    Alert.alert(
      'Recruter',
      'Do you really want to go to Recruter version of Timix?',
      [
        {text: 'No', style: 'cancel', onPress: () => {}},
        {
          text: 'Yes',
          onPress: () => {
            this.props.dispatch({type: 'goToRecruter'});
          },
        },
      ]
    );
  };

  state = {
    isVisible: true,
  };

  render() {
    return (
      <React.Fragment>
        <PageBase
          style={{
            backgroundColor: '#fafafa',
            height: HEIGHT - 44,
          }}>
          <IOSBar barStyle="dark-content" color="white" />
          {ProfileStore(state => {
            return (
              <Profile
                dropdown={this.dropdown}
                name={state.name}
                onEditProfile={this.handleEditProfile}
                avatar={state.avatar}
                aboutMe={state.aboutMe}
              />
            );
          })}
          <ListGroup>
            <SettingCell>
              <Image
                source={require('../../asset/setting.png')}
                style={{width: 24, height: 24}}
              />
              <Text TestID="Account" style={{marginLeft: 8}}>
                Account settings
              </Text>
            </SettingCell>
            <SettingCell no>
              <Image
                source={require('../../asset/notification.png')}
                style={{width: 24, height: 24}}
              />
              <Text style={{marginLeft: 8}}>Notifications</Text>
            </SettingCell>
          </ListGroup>
          <ListGroup>
            <SettingCell onPress={this.goToRecruter}>
              <Image
                source={require('../../asset/hiring.png')}
                style={{width: 24, height: 24}}
              />
              <Text style={{marginLeft: 8}}>Recruiter</Text>
            </SettingCell>
            <SettingCell onPress={this.handleLogout} no>
              <Image
                source={require('../../asset/logout.png')}
                style={{width: 24, height: 24}}
              />
              <Text style={{marginLeft: 8}}>Log out</Text>
            </SettingCell>
          </ListGroup>
          <ActionSheet
            ref={o => (this.ActionSheet = o)}
            title={'Choose a picture or take a photo'}
            options={['Picture', 'Take a photo', 'cancel']}
            cancelButtonIndex={2}
            onPress={index => {
              if (index === 0) {
                this.Picture();
              } else if (index === 1) {
                this.TakePhoto();
              }
            }}
          />
        </PageBase>
        <DropdownAlert
          showCancel
          updateStatusBar={false}
          closeInterval={1500}
          panResponderEnabled={false}
          zIndex={1000}
          ref={ref => (this.dropdown = ref)}
        />
      </React.Fragment>
    );
  }
}

export default connect()(
  Page({
    tabBarIcon: ({focused}) => (
      <View style={{marginTop: 8}}>
        <Entypo name="user" size={24} color={focused ? Theme : '#abb0b0'} />
      </View>
    ),
    tabBarOnPress: ({defaultHandler}) => {
      defaultHandler();
      StatusBar.setBarStyle('dark-content', true);
    },
  })(Account)
);
