import React from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import PageBase from '../../components/PageBase';
import Header from '../../components/Header';
import styled from 'styled-components';
import {Entypo, EvilIcons, FontAwesome} from '../../components/Icons';
import {EasyTap} from '../../public/EasyTap';
import {WIDTH, HEIGHT} from '../../utils/plaform';

import MapView from '../../components/MapView';

const DetailContainer = styled.View`
  border-radius: 4px;
  border-width: 0.5px;
  border-color: rgba(120, 120, 120, 0.1);
  background-color: white;
  min-height: 200px;
  margin: 8px;
  padding: 16px;
`;

const JobTitle = styled.Text`
  font-weight: 500;
  font-size: 24px;
`;
const InformationContainer = styled.View`
  border-radius: 8px;
  background-color: #fafafa;
  flex-direction: row;
  justify-content: space-between;
  padding: 8px;
  margin-top: 16px;
`;

const InfoBlock = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Margin8 = styled.Text`
  margin-top: 8px;
`;

const CompanyTitle = Margin8.extend`
  opacity: 0.8;
  font-size: 18px;
`;

const Salary = Margin8.extend`
  font-size: 18px;
  color: #fc740d;
`;

const Info = ({title, img, info}) => {
  return (
    <InfoBlock>
      <Image
        source={img}
        style={{width: 30, height: 22, marginBottom: 8}}
        resizeMode="contain"
      />
      <Text style={{fontWeight: '100', fontSize: 12}}>{title}</Text>
      <Text style={{fontSize: 12}}>{info}</Text>
    </InfoBlock>
  );
};

const Location = ({title}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginTop: 16,
        width: WIDTH / 2,
        alignItems: 'center',
      }}>
      <Image
        source={require('./location.png')}
        style={{width: 30, height: 22, marginBottom: 8}}
        resizeMode="contain"
      />
      <Text style={{fontSize: 12}}>{title}</Text>
    </View>
  );
};

const shadowStyle = {
  shadowColor: '#abb0b0',
  shadowOffset: {h: 16, w: 16},
  shadowRadius: 8,
  shadowOpacity: 0.3,
  padding: 16,
  borderRadius: 4,
  borderWidth: 0.5,
  borderColor: 'rgba(120,120,120,0.1)',
  marginBottom: 8,
  marginHorizontal: 8,
  backgroundColor: 'white',
};

const Detail = () => {
  return (
    <DetailContainer style={shadowStyle}>
      <JobTitle>Front of house and kitchen hand</JobTitle>
      <CompanyTitle>Mcdonals</CompanyTitle>
      <Salary>$45k - $55k</Salary>
      <InformationContainer>
        <Info
          title="Qualification"
          info="bachelor"
          img={require('./quali.png')}
        />
        <Info title="Job Type" info="Full time" img={require('./time.png')} />
        <Info
          title="Job Experience"
          info="4+ years"
          img={require('./case.png')}
        />
      </InformationContainer>
      <Location title="73 Tatora street, Auckland CBD, Auckland" />
      <MapView
        scrollEnabled={false}
        style={{width: WIDTH - 48, height: 165, borderRadius: 8, marginTop: 16}}
        region={{
          longitude: 121,
          latitude: 31.0,
          longitudeDelta: 0.1,
          latitudeDelta: 0.1,
        }}
      />
    </DetailContainer>
  );
};

const Section = ({title, children}) => {
  const TextStyle = {fontSize: 16, fontWeight: '300', marginBottom: 8};

  return (
    <View style={shadowStyle}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 16,
        }}>
        <Image
          source={require('./case.png')}
          style={{width: 30, height: 22}}
          resizeMode="contain"
        />
        <Text style={{fontSize: 18, marginLeft: 16}}>{title}</Text>
      </View>
      <Text style={TextStyle}>
        1. The beauty of astronomy is that anybody can do it. From the tiniest
        baby to the most advanced astrophysicist, there is something for anyone
        who wants to enjoy astronomy.
      </Text>
      <Text style={TextStyle}>
        2. The beauty of astronomy is that anybody can do it. From the tiniest
        baby to the most advanced astrophysicist, there is something for anyone
        who wants to enjoy astronomy.
      </Text>
      <Text style={TextStyle}>
        3. The beauty of astronomy is that anybody can do it. From the tiniest
        baby to the most advanced astrophysicist, there is something for anyone
        who wants to enjoy astronomy.
      </Text>
    </View>
  );
};

const Recruiter = () => {
  return (
    <View
      style={{
        ...shadowStyle,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <View>
        <Text style={{fontSize: 18}}>albert wesker</Text>
        <Text style={{opacity: 0.6}}>Holden recruiting</Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={require('./star.png')}
          style={{width: 12, height: 12}}
          resizeMode="contain"
        />
        <Text style={{opacity: 0.6, marginRight: 8}}>4.9</Text>
        <Entypo size={12} key={0} name="chevron-thin-right" color="#abb0b0" />
      </View>
    </View>
  );
};

export default class JobDetail extends React.Component {
  state = {
    opacity: 0,
    loading: true,
    region: {
      latitude: 37.48,
      longitude: 122.16,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    },
  };
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(res => {
      const lat = res.coords.latitude;
      const long = res.coords.longitude;
      this.setState({
        loading: false,
        region: {
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
          latitude: lat,
          longitude: long,
        },
      });
    });
  }

  render() {
    return (
      <React.Fragment>
        <Header
          leftButton={
            <EasyTap key={1} onPress={() => this.props.navigation.goBack()}>
              <Entypo
                size={16}
                color="white"
                key={0}
                name="chevron-thin-left"
              />
            </EasyTap>
          }
          rightButton={[
            <EasyTap onPress={() => this.props.navigation.goBack()}>
              <FontAwesome size={18} color="white" name="bell-o" />
            </EasyTap>,
            <EasyTap onPress={() => this.props.navigation.goBack()}>
              <FontAwesome size={18} color="white" name="bookmark-o" />
            </EasyTap>,
            <EasyTap onPress={() => this.props.navigation.goBack()}>
              <EvilIcons size={26} color="white" name="share-apple" />
            </EasyTap>,
          ]}
        />
        <PageBase
          update={true}
          style={{backgroundColor: 'white', height: HEIGHT - 48 - 20}}
          bar={
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTopWidth: 0.5,
                borderTopColor: 'rgba(120,120,120,0.1)',
              }}>
              <TouchableOpacity
                style={{
                  width: WIDTH / 2,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 48,
                }}>
                <Text>Chat</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: WIDTH / 2,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 48,
                }}>
                <Text>Apply</Text>
              </TouchableOpacity>
            </View>
          }>
          <Detail />
          <Recruiter />
          <Section title="Job Description" />
        </PageBase>
      </React.Fragment>
    );
  }
}
