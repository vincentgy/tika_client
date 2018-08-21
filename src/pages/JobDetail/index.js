import React from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import PageBase from '../../components/PageBase';
import Header from '../../components/Header';
import styled from 'styled-components';
import {Entypo} from '../../components/Icons';
import {EasyTap} from '../../public/EasyTap';
// import MapView from '../../components/MapView';

const DetailContainer = styled.View`
  border-radius: 4px;
  border-width: 0.5px;
  border-color: rgba(120, 120, 120, 0.1);
  background-color: white;
  margin-left: 16px;
  margin-right: 16px;
  min-height: 200px;
  margin-top: 16px;
`;

const Detail = () => {
  return (
    <DetailContainer
      style={{
        shadowColor: '#abb0b0',
        shadowOffset: {h: 16, w: 16},
        shadowRadius: 8,
        shadowOpacity: 0.3,
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          flexDirection: 'row',
          padding: 16,
        }}>
        <View style={{width: 200}}>
          <Text style={{fontSize: 24, width: 150}}>
            JavaScript Developer - Web
          </Text>
          <Text style={{paddingTop: 8}}>3 years/full-time</Text>
          <Text style={{paddingTop: 8}}>$30k-$50k</Text>
        </View>
        <Image
          source={require('./alibaba.png')}
          style={{width: 48, height: 48}}
        />
      </View>
      <TouchableOpacity
        activeOpacity={1}
        style={{
          margin: 16,
          borderTopWidth: 0.5,
          borderTopColor: 'rgba(120,120,120,0.1)',
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{flexDirection: 'row', marginTop: 16}}>
          <Entypo
            name="location-pin"
            size={16}
            style={{marginRight: 8, color: '#abb0b0'}}
          />
          <Text>North Shore</Text>
        </View>
        <Entypo
          style={{marginTop: 16, color: '#abb0b0'}}
          name="chevron-small-right"
          size={12}
        />
      </TouchableOpacity>
    </DetailContainer>
  );
};

const Section = ({title, children}) => {
  return (
    <View style={{padding: 16}}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 18}}>{title}</Text>
        <View
          style={{
            borderTopColor: 'rgba(120,120,120,0.1)',
            borderTopWidth: 0.5,
            width: '65%',
          }}
        />
      </View>
      {children}
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
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
          latitude: lat,
          longitude: long,
        },
      });
    });
  }

  render() {
    // this.state.loading ? null : (
    //   <MapView region={this.state.region} style={{flex: 1}} />
    // );

    return (
      <React.Fragment>
        <Header
          title={<Text style={{opacity: this.state.opacity}}>123</Text>}
          leftButton={[
            <EasyTap key={1} onPress={() => this.props.navigation.goBack()}>
              <Entypo
                size={16}
                color="black"
                key={0}
                name="chevron-thin-left"
              />
            </EasyTap>,
          ]}
        />

        <PageBase
          update={false}
          onScroll={cc => {
            this.setState({
              opacity: cc.nativeEvent.contentOffset.y / 40,
            });
          }}
          style={{backgroundColor: 'white'}}>
          <Detail />
          <Section title="Employer" />
          <Section title="Description" />
          <Section title="Company" />
          <Section title="More" />
        </PageBase>
      </React.Fragment>
    );
  }
}
