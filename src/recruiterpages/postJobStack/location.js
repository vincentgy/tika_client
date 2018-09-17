import React from 'react';
import {View, Text, Platform, ScrollView} from 'react-native';
import Header from '../../components/Header';
import List from '../../components/List';
import AutoComplete from 'react-native-autocomplete-input';
import {Auto, Put, getStore} from '../../store';
import Modal from '../../components/react-native-modal';
import Handle from '../../components/Handle';
import {Regions, Disctrict} from '../../components/area';
import {NextBottom} from './nextButton';
import {HEIGHT} from '../../utils/plaform';
import {NetworkManager} from '../../manager/networkManager';
import {EasyTap} from '../../public/EasyTap';
import {Entypo} from '../../components/Icons';

const LocationStore = Auto(state => state.createJob.Location);

class LLTextInput extends React.Component {
  shouldComponentUpdate(nextProps) {
    return (
      Platform.OS !== 'ios' ||
      (this.props.value === nextProps.value &&
        (nextProps.defaultValue == undefined ||
          nextProps.defaultValue == '')) ||
      (this.props.defaultValue === nextProps.defaultValue &&
        (nextProps.value == undefined || nextProps.value == ''))
    );
  }

  render() {
    return <AutoComplete {...this.props} />;
  }
}

export default class Location extends React.Component {
  state = {
    isRegionVisiable: false,
    isDistrictVisiable: false,
  };

  onAddressChange = text => {
    Put(state => {
      state.createJob.Location.Address = text;
    });
  };

  /**
   * id: region 的 id
   * region: 名字
   */
  changeRegion = ({id, region}) => {
    Put(state => {
      state.createJob.Location.Region = {id, region};
    });
    this.setState({isRegionVisiable: false});
  };

  /**
   * id: District 的 id
   * name: 名字
   */
  changeDistrict = ({id, name}) => {
    Put(state => {
      state.createJob.Location.District = {id, name};
    });
    this.setState({isDistrictVisiable: false});
  };

  async onDone() {
    const store = getStore().createJob;

    const manager = new NetworkManager();

    const json = await manager.postJob(
      store.description.JobTitle,
      store.description.Company,
      store.description.description,
      store.JobType.type,
      store.JobType.type,
      store.JobType.min,
      store.JobType.max,
      store.Location.Region.id,
      store.Location.District.id,
      store.Location.Address,
      store.description.position,
      store.categories
        .filter(item => {
          if (item.isSelected === true) {
            return item;
          }
        })
        .map(item => {
          return item.id;
        })
    );

    if (json.ret === 0) {
      // 成功
    } else {
      // 失败
    }
  }

  render() {
    return (
      <View>
        <Header
          leftButton={[
            <EasyTap key={0} onPress={() => this.props.navigation.goBack()}>
              <Entypo size={16} color="white" name="chevron-thin-left" />
            </EasyTap>,
          ]}
          title={
            <View>
              <Header.LargeTitle>Create job: Location</Header.LargeTitle>
              <Header.Title>Step 4 of 4</Header.Title>
            </View>
          }
        />
        <View style={{height: HEIGHT - 40 - 76}}>
          {LocationStore(local => {
            return (
              <React.Fragment>
                <List
                  title={
                    <Text
                      style={{marginLeft: 16, marginTop: 16, color: '#abb0b0'}}>
                      LOCATION
                    </Text>
                  }>
                  <List.Item
                    desc={local.Region.region}
                    key={1}
                    title="Region"
                    onPress={() => this.setState({isRegionVisiable: true})}
                  />
                  <List.Item
                    desc={local.District.name}
                    key={2}
                    title="Distrct"
                    onPress={() => this.setState({isDistrictVisiable: true})}
                  />
                </List>
                <LLTextInput
                  placeholder="address"
                  onChangeText={this.onAddressChange}
                  value={local.Address}
                  containerStyle={{
                    padding: 12,
                    backgroundColor: 'white',
                  }}
                  inputContainerStyle={{borderWidth: 0}}
                />
              </React.Fragment>
            );
          })}
        </View>
        <NextBottom title="Done" onPress={() => this.onDone()} />
        <Modal
          isVisible={this.state.isRegionVisiable}
          hasHandle
          style={{margin: 0, justifyContent: 'flex-end'}}
          renderHandle={() => (
            <Handle onPress={() => this.setState({isRegionVisiable: false})} />
          )}
          onSwipe={() => this.setState({isRegionVisiable: false})}
          swipeDirection="down">
          <View style={{height: 350, backgroundColor: 'white'}}>
            <ScrollView>
              <List>
                {Regions.map(item => {
                  return (
                    <List.Item
                      onPress={() => this.changeRegion(item)}
                      key={item.id}
                      title={item.region}
                    />
                  );
                })}
              </List>
            </ScrollView>
          </View>
        </Modal>
        <Modal
          isVisible={this.state.isDistrictVisiable}
          hasHandle
          style={{margin: 0, justifyContent: 'flex-end'}}
          renderHandle={() => (
            <Handle
              onPress={() => this.setState({isDistrictVisiable: false})}
            />
          )}
          onSwipe={() => this.setState({isDistrictVisiable: false})}
          swipeDirection="down">
          <View style={{height: 350, backgroundColor: 'white'}}>
            <ScrollView>
              <List>
                {LocationStore(state => {
                  return Disctrict[state.Region.id].map(item => {
                    return (
                      <List.Item
                        onPress={() => this.changeDistrict(item)}
                        key={item.id}
                        title={item.name}
                      />
                    );
                  });
                })}
              </List>
            </ScrollView>
          </View>
        </Modal>
      </View>
    );
  }
}
