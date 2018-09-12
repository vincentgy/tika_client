//https://github.com/Flipkart/recyclerlistview/blob/21049cc89ad606ec9fe8ea045dc73732ff29eac9/src/core/RecyclerListView.tsx#L540-L634

/***
 Use this component inside your React Native Application.
 A scrollable list with different item type
 */
import React from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  RefreshControl,
  Platform,
} from 'react-native';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';
import {Entypo} from '../../components/Icons';

import Filter from '../../pages/ModalFilter';
import {WIDTH, HEIGHT} from '../../utils/plaform';

import styled from 'styled-components';
import Header from '../../components/Header';
import {Theme} from '../../utils/color';
import timeago from 'timeago.js';

const ViewTypes = {
  FULL: 0,
  HALF_LEFT: 1,
  HALF_RIGHT: 2,
};

export const Search = styled.TouchableOpacity`
  height: 40px;
  width: 40px;
  justify-content: center;
  flex-direction: row;
  align-items: center;
`;

export default class JobList extends React.Component {
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
        if (index % 3 === 0) {
          return ViewTypes.FULL;
        } else if (index % 3 === 1) {
          return ViewTypes.HALF_LEFT;
        } else {
          return ViewTypes.HALF_RIGHT;
        }
      },
      (type, dim) => {
        dim.width = width;
        dim.height = Platform.OS === 'ios' ? 96 : 144;
      }
    );

    //Since component should always render once data has changed, make data provider part of the state
    this.state = {
      dataProvider: dataProvider,
    };
  }

  //Given type and data return the view component
  _rowRenderer = (type, data) => {
    const nows = timeago().format(data.timestamp);
    console.log(data);
    return (
      <TouchableOpacity
        onPress={() => this.props.onSelect && this.props.onSelect(data)}
        activeOpacity={0.7}
        style={{
          backgroundColor: 'white',
          marginHorizontal: 8,
          borderRadius: 4,
          marginTop: 8,
          height: 88,
        }}>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 4,
          }}>
          <View style={{flexDirection: 'row', padding: 8}}>
            <Image
              style={{width: 40, height: 40}}
              source={require('./alibaba.png')}
            />
            <View
              style={{
                marginLeft: 16,
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View>
                {/* <Text ellipsizeMode="tail" numberOfLines={1} width={100}>
                  {data.title}
                </Text> */}
                <Text
                  style={{color: 'black', fontSize: 16, marginBottom: 8}}
                  ellipsizeMode="tail"
                  numberOfLines={1}>
                  {data.title}
                  {/* {data.company} */}
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{color: '#8A8A8F', fontSize: 12, fontWeight: '300'}}>
                    {data.location}
                  </Text>
                  <Text
                    style={{
                      color: '#8A8A8F',
                      fontSize: 12,
                      fontWeight: '300',
                    }}>{`    ${nows}`}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    marginTop: 8,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      backgroundColor: 'rgba(29,170,146,0.1)',
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      borderRadius: 4,
                    }}>
                    <Text
                      style={{
                        fontWeight: '100',
                        color: '#1DAA92',
                        fontSize: 12,
                      }}>
                      {data.minimum_pay / 1000}k-{data.maximum_pay / 1000}k
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      backgroundColor: 'rgba(33,33,33,0.05)',
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      borderRadius: 4,
                      marginLeft: 8,
                    }}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '100',
                        color: '#333',
                      }}>
                      full time
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
    //You can return any view here, CellContainer has no special significance
  };

  gotoSearch = () => {
    this.props.navigation.navigate('SearchJob');
  };

  render() {
    // const size = this.props.list._size;

    return (
      <React.Fragment>
        <Header
          title={this.props.title}
          leftButton={this.props.leftButton}
          rightButton={this.props.rightButton}
          title={this.props.title}
        />
        <Filter componentDidMount={this.props.componentDidMount} />
        {/* {size === 0 ? <Text>there is no data</Text> : null} */}
        <RecyclerListView
          scrollViewProps={{
            refreshControl: (
              <RefreshControl
                refreshing={this.props.loading}
                onRefresh={() => {}}
                tintColor={'rgba(120,120,120,0.4)'}
                titleColor={Theme}
                colors={[Theme, Theme, Theme]}
                progressBackgroundColor="white"
              />
            ),
          }}
          style={{
            height: HEIGHT,
            width: WIDTH,
          }}
          layoutProvider={this._layoutProvider}
          dataProvider={this.props.list}
          rowRenderer={this._rowRenderer}
        />
      </React.Fragment>
    );
  }
}
