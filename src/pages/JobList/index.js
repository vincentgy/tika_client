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
} from 'react-native';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';
import {EvilIcons, Entypo} from '../../components/Icons';
import Header from '../../components/Header';
import Filter from '../ModalFilter';
import {WIDTH, HEIGHT} from '../../utils/plaform';
import {Theme} from '../../utils/color';
import {connect} from 'react-redux';

const ViewTypes = {
  FULL: 0,
  HALF_LEFT: 1,
  HALF_RIGHT: 2,
};

class JobList extends React.Component {
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
        dim.height = 144;
      }
    );

    //Since component should always render once data has changed, make data provider part of the state
    this.state = {
      dataProvider: dataProvider,
    };
  }

  //Given type and data return the view component
  _rowRenderer = (type, data) => {
    return (
      <TouchableOpacity activeOpacity={0.7} style={{backgroundColor: 'white'}}>
        <View
          style={{
            paddingVertical: 8,
            marginHorizontal: 16,
            backgroundColor: 'white',
            borderBottomWidth: 1,
            borderBottomColor: 'rgba(120,120,120,0.1)',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              style={{width: 40, height: 40, zIndex: 1000}}
              source={require('./alibaba.png')}
            />
            <View style={{marginVertical: 8, marginLeft: 16}}>
              <Text style={{color: 'black', fontSize: 16}}>{data.company}</Text>
              <Text style={{color: 'black', fontSize: 12}}>
                {data.location}
              </Text>
            </View>
          </View>
          <Text>{data.title}</Text>
        </View>
        <View
          style={{
            paddingVertical: 8,
            marginHorizontal: 16,
            flexDirection: 'row',
            backgroundColor: 'white',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text>HowManyPosition: {1}</Text>
          <Entypo size={12} key={0} name="chevron-thin-right" color="#2D59D9" />
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
          leftButton={[
            <Text style={{color: 'white'}} key="1">
              Job Search
            </Text>,
          ]}
          rightButton={[
            <EvilIcons
              onPress={this.gotoSearch}
              color={'white'}
              key="1"
              name="search"
              size={24}
            />,
          ]}
        />
        <Filter />
        {/* {size === 0 ? <Text>there is no data</Text> : null} */}
        <RecyclerListView
          scrollViewProps={{
            refreshControl: (
              <RefreshControl
                refreshing={this.props.loading}
                onRefresh={() => {}}
                tintColor={Theme}
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

const mapState = state => {
  return {
    loading: state.filter.loading,
    list: state.filter.list,
  };
};

export default connect(mapState)(JobList);