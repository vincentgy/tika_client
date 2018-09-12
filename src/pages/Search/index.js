import React from 'react';
import {View, Text, TextInput} from 'react-native';
import Header from '../../components/Header';

import {Theme} from '../../utils/color';
import {WithGoback} from '../../utils/withGoback';
import {EvilIcons} from '../../components/Icons';
import {EasyTap} from '../../public/EasyTap';
import {NetworkManager} from '../../manager/networkManager';
import {getStore, Put} from '../../store';

@WithGoback
export default class SearchJob extends React.Component {
  state = {
    text: '',
  };

  async handleEndEditing() {
    // Alert.alert(this.state.text);
    // this.props.navigation.navigate('SearchResult')
    const manager = new NetworkManager();
    const s = getStore();

    Put(state => {
      state.job.loading = true;
    });
    const json = await manager.textSearch(this.state.text);
    Put(state => {
      state.job.list = s.job.list.cloneWithRows(json.data);
      state.job.loading = false;
    });
  }

  handleOnChangeText = text => {
    this.setState({
      text: text,
    });
  };

  render() {
    return (
      <View>
        <Header
          rightButton={
            <EasyTap key={1} onPress={this.props.goback}>
              <EvilIcons name="close" color="white" size={24} />
            </EasyTap>
          }>
          <View
            style={{
              backgroundColor: '#f5f5f5',
              width: '75%',
              borderRadius: 100,
              height: 32,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                marginLeft: 16,
                fontSize: 12,
                paddingRight: 8,
                borderRightWidth: 1,
                borderRightColor: 'rgba(120,120,120,0.1)',
              }}>
              placeholder
            </Text>
            <View style={{width: '70%', height: 38, paddingLeft: 6}}>
              <TextInput
                onSubmitEditing={() => this.handleEndEditing()}
                returnKeyType="done"
                autoFocus
                onChangeText={this.handleOnChangeText}
                selectionColor={Theme}
                style={{fontSize: 12, height: 40}}
                placeholder="job title or company"
                underlineColorAndroid="transparent"
                placeholderTextColor={'rgba(120,120,120,0.4)'}
              />
            </View>
          </View>
        </Header>
      </View>
    );
  }
}
