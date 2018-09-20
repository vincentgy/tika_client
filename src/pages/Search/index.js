import React from 'react';
import {View, Text, TextInput, RefreshControl, Dimensions} from 'react-native';
import Header from '../../components/Header';

import {Theme} from '../../utils/color';
import {WithGoback} from '../../utils/withGoback';
import {EvilIcons} from '../../components/Icons';
import {EasyTap} from '../../public/EasyTap';
import {NetworkManager} from '../../manager/networkManager';
import JobListItem from '../../public/JobListItem';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';
import {HEIGHT, WIDTH} from '../../utils/plaform';
import {Put} from '../../store';

@WithGoback
export default class SearchJob extends React.Component {
  async handleEndEditing() {
    this.setState({
      loading: true,
    });
    const manager = new NetworkManager();
    const json = await manager.textSearch(this.state.text);
    console.log(json);
    this.setState({
      resultList: json.data,
      loading: false,
    });
  }

  handleOnChangeText = text => {
    this.setState({
      text: text,
    });
  };

  constructor(args) {
    super(args);

    let {width} = Dimensions.get('window');

    //Create the data provider and provide method which takes in two rows of data and return if those two are different or not.
    //THIS IS VERY IMPORTANT, FORGET PERFORMANCE IF THIS IS MESSED UP
    let dataProvider = new DataProvider((r1, r2) => {
      return r1 !== r2;
    });

    //Create the layout provider
    //First method: Given an index return the type of item e.g ListItemType1, ListItemType2 in case you have variety of items in your list/grid
    //Second: Given a type and object set the exact height and width for that type on given object, if you're using non deterministic rendering provide close estimates
    //If you need data based check you can access your data provider here
    //You'll need data in most cases, we don't provide it by default to enable things like data virtualization in the future
    //NOTE: For complex lists LayoutProvider will also be complex it would then make sense to move it to a different file
    this._layoutProvider = new LayoutProvider(
      index => {
        return index;
      },
      (type, dim) => {
        dim.width = width;
        dim.height = JobListItem.HEIGHT;
      }
    );

    //Since component should always render once data has changed, make data provider part of the state
    this.state = {
      dataProvider: dataProvider,
      text: '',
      resultList: [],
      loading: false,
    };
  }

  //Given type and data return the view component
  _rowRenderer = (type, data) => {
    return (
      <JobListItem
        {...data}
        onPress={() => {
          Put(state => {
            state.currentSelectJobItem = data;
          });
          this.props.navigation.navigate('JobDetail');
        }}
      />
    );
    //You can return any view here, CellContainer has no special significance
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
            <View style={{width: '90%', height: 38, paddingLeft: 6}}>
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
        <RecyclerListView
          scrollViewProps={{
            refreshControl: (
              <RefreshControl
                refreshing={this.state.loading}
                onRefresh={() => {
                  console.log('刷新');
                }}
                tintColor={'rgba(120,120,120,0.4)'}
                titleColor={Theme}
                colors={[Theme, Theme, Theme]}
                progressBackgroundColor="white"
                style={{backgroundColor: 'transparent'}}
              />
            ),
          }}
          style={{
            height: HEIGHT - 76,
            width: WIDTH,
          }}
          layoutProvider={this._layoutProvider}
          dataProvider={this.state.dataProvider.cloneWithRows(
            this.state.resultList
          )}
          rowRenderer={this._rowRenderer}
        />
      </View>
    );
  }
}
