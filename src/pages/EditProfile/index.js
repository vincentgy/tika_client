import React from 'react';
import {View, TouchableOpacity, Image, Text} from 'react-native';
import PageBase from '../../components/PageBase';
import InformationContainer from '../../public/InformationContainer';
import Header from '../../components/Header';
import styled from 'styled-components';
import {WIDTH, HEIGHT} from '../../utils/plaform';
import {
  Entypo,
  Ionicons,
  EvilIcons,
  MaterialIcons,
} from '../../components/Icons';
import {EasyTap} from '../../public/EasyTap';
import {Auto, getStore} from '../../store';
import Card from '../../components/Card';
import {NetworkManager} from '../../manager/networkManager';

const Name = styled.Text`
  font-size: 18px;
  font-weight: 700;
`;

const AddButton = ({onPress, desc}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 40,
      }}>
      <Text style={{color: '#2f54eb'}}>{desc}</Text>
      <Ionicons
        name="ios-add"
        size={22}
        style={{marginRight: 8}}
        color="#2f54eb"
      />
    </TouchableOpacity>
  );
};

const EditBlock = ({
  title,
  icon,
  onPress,
  desc,
  renderContent,
  isRenderContent,
}) => {
  return (
    <Card style={{paddingBottom: 0}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderBottomColor: 'rgba(120,120,120,0.2)',
          borderBottomWidth: 0.5,
          paddingBottom: 8,
        }}>
        <Image source={icon} style={{width: 16, height: 16}} />
        <Text style={{marginLeft: 8}}>{title}</Text>
      </View>
      {isRenderContent ? renderContent() : null}
      <AddButton desc={desc} onPress={onPress} />
    </Card>
  );
};

const HistBlock = ({place, task, start, end, onPress}) => {
  return (
    <View
      style={{
        borderBottomColor: 'rgba(120,120,120,0.1)',
        borderBottomWidth: 0.5,
        paddingVertical: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <View>
        <Text>{task}</Text>
        <View>
          <Text style={{color: '#abb0b0', fontWeight: '100', fontSize: 12}}>
            {place}
          </Text>
        </View>
        <Text
          style={{
            color: '#FC4C0D',
            marginTop: 8,
            fontWeight: '100',
            fontSize: 12,
          }}>
          {`${start} - ${end}`}
        </Text>
      </View>
      <EasyTap onPress={onPress}>
        <Entypo name="dots-three-horizontal" color="#2f54eb" />
      </EasyTap>
    </View>
  );
};

const AboutMeText = Auto(state => state.profile.aboutMe);
const EmploymentHistoryArray = Auto(state => state.profile.experiences);
const QualificationArray = Auto(state => state.profile.qualification);
const SkillsArray = Auto(state => state.profile.skills);

export default class EditProfile extends React.Component {
  navigation = pages => {
    this.props.navigation.navigate(pages);
  };

  async finisheProfileEditing() {
    const manager = new NetworkManager();
    const Store = getStore();

    console.log('开始发送');
    const json = await manager.UpdateProfile(
      Store.profile.aboutMe,
      Store.profile.skills,
      Store.profile.qualification,
      Store.profile.experiences
    );
    console.log(json);
  }

  render() {
    return (
      <React.Fragment>
        <Header
          leftButton={[
            <EasyTap key={1} onPress={() => this.props.navigation.goBack()}>
              <Entypo
                size={16}
                color="white"
                key={0}
                name="chevron-thin-left"
              />
            </EasyTap>,
          ]}
          rightButton={[
            <EasyTap key={1} onPress={() => this.finisheProfileEditing()}>
              <MaterialIcons size={20} color="white" key={0} name="check" />
            </EasyTap>,
          ]}
        />
        <PageBase
          style={{backgroundColor: '#fafafa', height: HEIGHT - 48 - 20}}>
          <Card style={{marginTop: 8}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{width: WIDTH / 3}}>
                <Name>Kenneth van Reeves</Name>
              </View>
              <TouchableOpacity
                style={{
                  shadowColor: '#abb0b0',
                  shadowOffset: {h: 16, w: 16},
                  shadowRadius: 8,
                  shadowOpacity: 0.3,
                }}>
                <Image
                  cache="reload"
                  source={require('./temp.png')}
                  style={{
                    width: 64,
                    height: 64,
                    marginRight: 16,
                    borderRadius: 32,
                  }}
                />
              </TouchableOpacity>
            </View>
          </Card>
          {AboutMeText(text => (
            <EditBlock
              isRenderContent={text.length !== 0}
              onPress={() => this.navigation('AboutMe')}
              title="About me"
              icon={require('../../asset/me.png')}
              desc={'Edit about me'}
              renderContent={() => (
                <Text
                  style={{
                    color: '#333',
                    fontWeight: '300',
                    paddingVertical: 8,
                    borderBottomColor: 'rgba(120,120,120,0.1)',
                    borderBottomWidth: 0.5,
                  }}>
                  {text}
                </Text>
              )}
            />
          ))}
          {EmploymentHistoryArray(experiences => (
            <EditBlock
              isRenderContent={experiences.length > 0}
              onPress={() => this.navigation('WorkExprience')}
              title="Employment history"
              icon={require('../../asset/employment_history.png')}
              desc="Add Employment history"
              renderContent={() =>
                experiences.map((expo, idx) => {
                  return (
                    <HistBlock
                      key={idx}
                      {...expo}
                      onPress={() => this.navigation('WorkExprience')}
                    />
                  );
                })
              }
            />
          ))}
          {QualificationArray(qualification => (
            <EditBlock
              isRenderContent={qualification.length > 0}
              onPress={() => this.navigation('Qualification')}
              title="Qualification"
              icon={require('../../asset/qualification.png')}
              desc="Add Qualification"
              renderContent={() =>
                qualification.map((expo, idx) => {
                  return (
                    <HistBlock
                      key={idx}
                      task={expo.degree}
                      place={expo.school}
                      start={expo.start}
                      end={expo.end}
                    />
                  );
                })
              }
            />
          ))}
          {SkillsArray(skill => (
            <EditBlock
              isRenderContent={skill.length > 0}
              onPress={() => this.navigation('Skills')}
              title="Skills"
              icon={require('../../asset/me.png')}
              desc="Add skills"
              renderContent={() => (
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    borderBottomColor: 'rgba(120,120,120,0.1)',
                    borderBottomWidth: 0.5,
                    paddingVertical: 8,
                  }}>
                  {skill.map((expo, idx) => (
                    <View
                      key={idx}
                      style={{
                        backgroundColor: 'rgba(31,44,55,0.1)',
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 4,
                        marginLeft: 8,
                        marginVertical: 4,
                        borderRadius: 8,
                      }}>
                      <Text style={{color: '#1F2C43', fontSize: 12}}>
                        {expo}
                      </Text>
                    </View>
                  ))}
                </View>
              )}
            />
          ))}

          <EditBlock
            title="Portfolio/LinkedIn"
            icon={require('../../asset/social.png')}
            desc="Add websites"
          />
        </PageBase>
      </React.Fragment>
    );
  }
}
