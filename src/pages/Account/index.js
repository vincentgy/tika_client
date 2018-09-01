import React from 'react';
import {
  View,
  StatusBar,
  Text,
  Image,
  TouchableOpacity,
  AsyncStorage,
  Alert,
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
import Picker from 'react-native-wheel-picker';
var PickerItem = Picker.Item;

const ListGroup = ({children}) => {
  return <View style={{marginTop: 8}}>{children}</View>;
};
const ProfileContainer = styled.View`
  height: 200px;
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

const Profile = ({onEditProfile, onAatarPress}) => {
  return (
    <FetcherNoCache body={{a: 'gp', token: userManager.getToken()}}>
      {({fetchData}) => (
        <ProfileContainer>
          <View>
            <Name>{fetchData.data.name}</Name>
            <Bref>have 3 years background of web dev</Bref>
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
              <Text style={{color: '#abb0b0', paddingLeft: 8}}>
                Edit profile
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={onAatarPress}>
            <Image
              cache="reload"
              source={{uri: `${fetchData.data.avatar}?${Math.random()}`}}
              style={{
                width: 64,
                height: 64,
                marginRight: 16,
                borderRadius: 32,
              }}
            />
          </TouchableOpacity>
        </ProfileContainer>
      )}
    </FetcherNoCache>
  );
};

@connect()
class Account extends React.Component {
  state = {
    selectedItem: 2,
    itemList: [
      '刘备',
      '张飞',
      '关羽',
      '赵云',
      '黄忠',
      '马超',
      '魏延',
      '诸葛亮',
    ],
  };
  onPickerSelect(index) {
    this.setState({
      selectedItem: index,
    });
  }

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

  showActionSheet = () => {
    this.ActionSheet.show();
  };

  Picture = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
      cropperCircleOverlay: true,
    })
      .then(image => {
        let formData = new FormData();
        let file = {
          uri: image.path,
          type: image.mime,
          name: 'fileToUpload',
        };
        formData.append('fileToUpload', file);
        fetch(
          `http://18.222.175.208/upload.php?token=${userManager.getToken()}&c=u`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            body: formData,
          }
        )
          .then(responseData => {
            responseData.json().then(res => {
              console.log(res);
            });
          })
          .catch(res => {
            console.log(res, '上传错误');
          });
      })
      .catch(e => {});
  };

  TakePhoto = () => {
    ImagePicker.openCamera({
      width: 400,
      height: 400,
      cropping: true,
      cropperCircleOverlay: true,
    })
      .then()
      .catch();
  };

  render() {
    return (
      <PageBase
        style={{
          backgroundColor: '#fafafa',
          height: HEIGHT - 44,
        }}>
        <IOSBar barStyle={'dark-content'} color="white" />
        <Profile
          onEditProfile={this.handleEditProfile}
          onAatarPress={this.showActionSheet}
        />
        <Picker
          style={{width: WIDTH, height: 180}}
          selectedValue={this.state.selectedItem}
          itemStyle={{color: 'black',borderColor:'black', fontSize: 26}}
          onValueChange={index => this.onPickerSelect(index)}>
          {this.state.itemList.map((value, i) => (
            <PickerItem label={value} value={i} key={'money' + value} />
          ))}
        </Picker>
        <ListGroup>
          <SettingCell>
            <Text>Favorite</Text>
          </SettingCell>
          <SettingCell>
            <Text>Help</Text>
          </SettingCell>
          <SettingCell no>
            <Text>Setting</Text>
          </SettingCell>
        </ListGroup>
        <ListGroup>
          <SettingCell>
            <Text>Switch role</Text>
          </SettingCell>
          <SettingCell onPress={this.handleLogout} no>
            <Text>Log out</Text>
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
    );
  }
}

export default Page({
  tabBarIcon: ({focused}) => (
    <View style={{marginTop: 8}}>
      <Entypo name="user" size={24} color={focused ? Theme : '#abb0b0'} />
    </View>
  ),
  tabBarOnPress: ({defaultHandler}) => {
    defaultHandler();
    StatusBar.setBarStyle('dark-content', true);
  },
})(Account);
