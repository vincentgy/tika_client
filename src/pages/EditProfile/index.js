import React from 'react';
import {View, TouchableOpacity, Image, Text} from 'react-native';
import PageBase from '../../components/PageBase';
import InformationContainer from '../../public/InformationContainer';
import {shadowStyle} from '../../public/shadowStyle';
import Header from '../../components/Header';
import styled from 'styled-components';
import {WIDTH, HEIGHT} from '../../utils/plaform';
import {Entypo} from '../../components/Icons';
import {EasyTap} from '../../public/EasyTap';
import {Auto} from '../../store';

const Info = InformationContainer.Info;

const Name = styled.Text`
  font-size: 18px;
  font-weight: 700;
`;

const ShortBref = styled.Text`
  color: #abb0b0;
  font-size: 12;
  margin-top: 16px;
`;

const EditBlock = ({
  title,
  icon,
  desc,
  onPress,
  renderContent,
  isShow = true,
}) => {
  return (
    <View style={shadowStyle}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image source={icon} style={{width: 24, height: 24}} />
        <Text style={{fontSize: 18, fontWeight: '700', marginLeft: 16}}>
          {title}
        </Text>
      </View>
      {renderContent && renderContent()}
      {isShow ? (
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 16,
          }}>
          <TouchableOpacity onPress={onPress}>
            <Image
              source={require('../../asset/add.png')}
              style={{width: 48, height: 48}}
            />
          </TouchableOpacity>
          <Text style={{fontSize: 12, padding: 16, color: '#FC4C0D'}}>
            {desc}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

const AboutMeText = Auto(state => state.profile.aboutMe);

export default class EditProfile extends React.Component {
  navigation = pages => {
    this.props.navigation.navigate(pages);
  };

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
        />
        <PageBase
          style={{backgroundColor: '#fafafa', height: HEIGHT - 48 - 20}}>
          <View style={{...shadowStyle, marginTop: 8}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{width: WIDTH / 3}}>
                <Name>Kenneth van Reeves</Name>
                <ShortBref>Looking for work</ShortBref>
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
            <InformationContainer>
              <Info
                title="Experience"
                info="4+ years"
                img={require('../../asset/case.png')}
              />
              <Info
                title="Qualification"
                info="Bachelor"
                img={require('../../asset/quali.png')}
              />
              <Info
                title="Visa"
                info="Citizen"
                img={require('../../asset/time.png')}
              />
            </InformationContainer>
          </View>
          {AboutMeText(text => (
            <EditBlock
              isShow={text.length === 0}
              onPress={() => this.navigation('AboutMe')}
              title="About me"
              icon={require('../../asset/me.png')}
              renderContent={() => (
                <Text style={{padding: 16, color: '#333', fontWeight: '300'}}>
                  {text}
                </Text>
              )}
              desc="Click here to write somehting about yourself so employers get to know you better"
            />
          ))}
          <EditBlock
            onPress={() => this.navigation('WorkExprience')}
            title="Employment history"
            icon={require('../../asset/me.png')}
            desc="Click here to add your employment history, this will help employers to see if you have experience with the role."
          />
          <EditBlock
            onPress={() => this.navigation('Qualification')}
            title="Qualification"
            icon={require('../../asset/me.png')}
            desc="Click here to add your qualifications, this will help employers to see if you have experience with the role."
          />
          <EditBlock
            title="Skills"
            icon={require('../../asset/me.png')}
            desc="Click here to add skills to your Job profile. This will make it easier for employers to see what you are good at "
          />
          <EditBlock
            title="Portfolio/LinkedIn"
            icon={require('../../asset/me.png')}
            desc="Click here to add your linkedIn, Portfolio or anything else you think your employer might want to see"
          />
        </PageBase>
      </React.Fragment>
    );
  }
}
