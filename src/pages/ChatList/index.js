import React from 'react';
import {TouchableOpacity, View, Text, Image, StatusBar} from 'react-native';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';
import {Page} from '../../components/PageHOC';
import {FontAwesome} from '../../components/Icons';
import {Theme} from '../../utils/color';
import {WIDTH, HEIGHT} from '../../utils/plaform';
// import TestMap from '../JobList/testmap';
import Header from '../../components/Header';

@Page({
  tabBarIcon: ({focused}) => (
    <View>
      <FontAwesome
        name="comments"
        size={24}
        color={focused ? Theme : '#abb0b0'}
      />
      <View
        style={{
          position: 'absolute',
          width: 20,
          height: 20,
          marginLeft: 16,
          borderRadius: 10,
          backgroundColor: '#FF5E5E',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            backgroundColor: 'transparent',
            textAlign: 'center',
            fontSize: 12,
            color: 'white',
          }}>
          99
        </Text>
      </View>
    </View>
  ),
  tabBarOnPress: ({defaultHandler}) => {
    StatusBar.setBarStyle('light-content', true);
    defaultHandler();
  },
})
export default class Chat extends React.Component {
  constructor(args) {
    super(args);

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
        dim.width = WIDTH;
        dim.height = 60;
      }
    );

    //Since component should always render once data has changed, make data provider part of the state
    const chat = [];
    for (let index = 0; index < 20; index++) {
      chat.push(index);
    }

    this.state = {
      dataProvider: dataProvider.cloneWithRows(chat),
    };
  }

  //Given type and data return the view component
  _rowRenderer = (type, data) => {
    return (
      <TouchableOpacity activeOpacity={0.8} style={{backgroundColor: 'white'}}>
        <View
          style={{
            paddingVertical: 8,
            marginHorizontal: 16,
            backgroundColor: 'white',
            borderBottomWidth: 0.5,
            borderBottomColor: 'rgba(120,120,120,0.1)',
            flexDirection: 'row',
          }}>
          <Image
            style={{width: 40, height: 40, borderRadius: 20}}
            source={require('./alibaba.png')}
          />
          <View style={{marginLeft: 16}}>
            <Text>{data}</Text>
            <Text style={{marginTop: 8, color: '#abb0b0'}}>lastTime</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
    //You can return any view here, CellContainer has no special significance
  };

  render() {
    return (
      <React.Fragment>
        <Header />
        <RecyclerListView
          style={{
            height: HEIGHT,
            width: WIDTH,
            backgroundColor: 'white',
          }}
          layoutProvider={this._layoutProvider}
          dataProvider={this.state.dataProvider}
          rowRenderer={this._rowRenderer}
        />
      </React.Fragment>
      //   <TestMap style={{flex: 1}} />
    );
  }
}
