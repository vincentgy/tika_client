import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import PageBase from '../../components/PageBase';
import InformationContainer from '../../public/InformationContainer';
import {shadowStyle} from '../../public/shadowStyle';
import Header from '../../components/Header';
import styled from 'styled-components';
import {WIDTH} from '../../utils/plaform';

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

export default class EditProfile extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <PageBase style={{backgroundColor: '#fafafa'}}>
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
          <View style={shadowStyle} />
          <View style={shadowStyle} />
          <View style={shadowStyle} />
          <View style={shadowStyle} />
          <View style={shadowStyle} />
        </PageBase>
      </React.Fragment>
    );
  }
}
