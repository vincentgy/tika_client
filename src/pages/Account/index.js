import React from 'react';
import PageBase from '../../components/PageBase';
import {Page} from '../../components/PageHOC';
import styled from 'styled-components';
import {Image} from 'react-native';
import {WIDTH} from '../../utils/plaform';
import Picker from './temp';

const Container = styled.View``;
const ProfileContainer = styled.View`
  height: 300px;
  background-color: white;
`;

let CAR_MAKES_AND_MODELS = {
  amc: {
    name: 'AMC',
    models: ['AMX', 'Concord', 'Eagle', 'Gremlin', 'Matador', 'Pacer'],
  },
  alfa: {
    name: 'Alfa-Romeo',
    models: [
      '159',
      '4C',
      'Alfasud',
      'Brera',
      'GTV6',
      'Giulia',
      'MiTo',
      'Spider',
    ],
  },
  aston: {
    name: 'Aston Martin',
    models: ['DB5', 'DB9', 'DBS', 'Rapide', 'Vanquish', 'Vantage'],
  },
  audi: {
    name: 'Audi',
    models: [
      '90',
      '4000',
      '5000',
      'A3',
      'A4',
      'A5',
      'A6',
      'A7',
      'A8',
      'Q5',
      'Q7',
    ],
  },
  austin: {
    name: 'Austin',
    models: ['America', 'Maestro', 'Maxi', 'Mini', 'Montego', 'Princess'],
  },
  borgward: {
    name: 'Borgward',
    models: ['Hansa', 'Isabella', 'P100'],
  },
  buick: {
    name: 'Buick',
    models: [
      'Electra',
      'LaCrosse',
      'LeSabre',
      'Park Avenue',
      'Regal',
      'Roadmaster',
      'Skylark',
    ],
  },
  cadillac: {
    name: 'Cadillac',
    models: ['Catera', 'Cimarron', 'Eldorado', 'Fleetwood', 'Sedan de Ville'],
  },
  chevrolet: {
    name: 'Chevrolet',
    models: [
      'Astro',
      'Aveo',
      'Bel Air',
      'Captiva',
      'Cavalier',
      'Chevelle',
      'Corvair',
      'Corvette',
      'Cruze',
      'Nova',
      'SS',
      'Vega',
      'Volt',
    ],
  },
};
let PickerItem = Picker.Item;

@Page({tabBarLabel: 'My Account'})
export default class Account extends React.Component {
  state = {
    carMake: 'cadillac',
    modelIndex: 3,
  };
  render() {
    return (
      <PageBase>
        {/* <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        /> */}
        <Picker
          selectedValue={this.state.carMake}
          onValueChange={carMake => this.setState({carMake, modelIndex: 0})}>
          {Object.keys(CAR_MAKES_AND_MODELS).map(carMake => (
            <PickerItem
              key={carMake}
              value={carMake}
              label={CAR_MAKES_AND_MODELS[carMake].name}
            />
          ))}
        </Picker>
        <Container>
          <Image
            style={{
              width: WIDTH,
              height: 174,
            }}
            source={require('./temp.png')}
          />
          <Image
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              position: 'absolute',
              left: WIDTH / 2 - 50,
              top: 174 - 50,
              zIndex: 12,
              shadowOpacity: 0.75,
              shadowRadius: 5,
              shadowColor: 'red',
              shadowOffset: {height: 0, width: 0},
            }}
            source={require('./temp.png')}
          />
          <ProfileContainer />
        </Container>
      </PageBase>
    );
  }
}
