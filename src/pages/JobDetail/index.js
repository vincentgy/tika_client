import React from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import PageBase from '../../components/PageBase';
import Header from '../../components/Header';
import styled from 'styled-components';
import {Entypo, EvilIcons, FontAwesome} from '../../components/Icons';
import {EasyTap} from '../../public/EasyTap';
import {WIDTH, HEIGHT} from '../../utils/plaform';

import MapView from '../../components/MapView';
import InformationContainer from '../../public/InformationContainer';
import {shadowStyle} from '../../public/shadowStyle';

const Info = InformationContainer.Info;

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

const Detail = ({longitude, latitude}) => {
  return (
    <DetailContainer style={shadowStyle}>
      <JobTitle>Front of house and kitchen hand</JobTitle>
      <CompanyTitle>Mcdonals</CompanyTitle>
      <Salary>$45k - $55k</Salary>
      <InformationContainer>
        <Info
          title="Qualification"
          info="bachelor"
          img={require('../../asset/quali.png')}
        />
        <Info
          title="Job Type"
          info="Full time"
          img={require('../../asset/time.png')}
        />
        <Info
          title="Experience"
          info="4+ years"
          img={require('../../asset/case.png')}
        />
      </InformationContainer>
      <Location title="73 Tatora street, Auckland CBD, Auckland" />
      <MapView
        style={{width: WIDTH - 48, height: 165, borderRadius: 8, marginTop: 16}}
        x={latitude}
        y={longitude}
        region={{
          longitude: longitude,
          latitude: latitude,
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
          source={require('../../asset/case.png')}
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
    navigator.geolocation.getCurrentPosition(
      res => {
        const lat = res.coords.latitude;
        const long = res.coords.longitude;
        this.setState({
          loading: false,
          region: {
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
            latitude: lat,
            longitude: long,
          },
        });
      },
      () => {},
      {
        enableHighAccuracy: false,
        timeout: 1000,
        maxAge: 100,
      }
    );
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
            <EasyTap>
              <FontAwesome size={18} color="white" name="bell-o" />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 18,
                  width: 18,
                  position: 'absolute',
                  top: 4,
                  right: 4,
                  borderRadius: 10,
                  backgroundColor: 'red',
                }}>
                <Text style={{fontSize: 10, color: 'white'}}>10</Text>
              </View>
            </EasyTap>,
            <EasyTap>
              <FontAwesome size={18} color="white" name="bookmark-o" />
            </EasyTap>,
            <EasyTap>
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
          {this.state.loading ? null : (
            <Detail
              latitude={this.state.region.latitude}
              longitude={this.state.region.longitude}
            />
          )}
          <Recruiter />
          <Section title="Job Description" />
        </PageBase>
      </React.Fragment>
    );
  }
}
