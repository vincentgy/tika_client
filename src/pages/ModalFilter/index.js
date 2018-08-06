import React from 'react';
import {View, TouchableOpacity, Text, Modal, ScrollView} from 'react-native';
import {WIDTH, HEIGHT} from '../../utils/plaform';
import Toggle from '../../components/Abstract/Toggle';
import styled from 'styled-components';
import Switch, {FilterItem} from './swich';
import List from '../../components/List';
import LocationSelector from './location';
import FetchCategoris from '../../public/FetchCategoris';
import ButtonGroup from '../../public/ButtonGroup';

const ListItem = List.Item;

const FilterContainer = styled.View`
  height: 40px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(120, 120, 120, 0.1);
  background-color: white;
  flex-direction: row;
  align-items: center;
`;

class Filter extends React.Component {
  static defaultProps = {};

  getFilterView = node => (this.filter = node);

  render() {
    const FilterArray = ['Distance', 'Location', 'Categories', 'Pay Range'];

    return (
      <Toggle>
        {(ctrl, state, filterItem) => (
          <React.Fragment>
            <FilterContainer>
              {FilterArray.map((item, index) => (
                <FilterItem
                  key={index}
                  style={{width: WIDTH / 4}}
                  onPress={() => ctrl(item)}>
                  {item}
                </FilterItem>
              ))}
            </FilterContainer>
            <Modal
              animationType="none"
              transparent={true}
              visible={state}
              onRequestClose={() => ctrl()}>
              <Switch active={filterItem} Item={FilterArray}>
                <View h={350}>
                  <List>
                    <ListItem key="1" title="whole city" />
                    <ListItem key="2" title="1 km" />
                    <ListItem key="3" title="3 km" />
                    <ListItem key="4" title="5 km" />
                    <ListItem key="5" title="10 km" />
                  </List>
                </View>
                <LocationSelector h={396} />
                <ScrollView h={396}>
                  <FetchCategoris />
                  <ButtonGroup />
                </ScrollView>
                <Text>4</Text>
              </Switch>
              <TouchableOpacity
                onPress={ctrl}
                activeOpacity={1}
                style={{
                  width: WIDTH,
                  height: HEIGHT,
                  backgroundColor: 'rgba(0,0,0,0.6)',
                }}
              />
            </Modal>
          </React.Fragment>
        )}
      </Toggle>
    );
  }
}

export default Filter;
