import React from 'react';
import {StatusBar} from 'react-native';
import {Button} from 'react-native-elements';
import {connect} from 'react-redux';
import {Page} from '../../components/PageHOC';
import {Entypo, Ionicons} from '../../components/Icons';
import {Theme} from '../../utils/color';
import Header from '../../components/Header';
import List from '../../components/List';
import Modal from '../../components/react-native-modal';
import Handle from '../../components/Handle';

import {View, Text, Dimensions, Image} from 'react-native';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';
import JobListItem from '../../public/JobListItem';
import {EasyTap} from '../../public/EasyTap';

const TempData = [
  {
    avatar:
      'https://cms.qz.com/wp-content/uploads/2018/08/RTX4RKWN-e1533787363757.jpg?quality=75&strip=all&w=410&h=232',
    first: 'Elon',
    last: 'Musk',
  },
  {
    avatar:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Steve_Jobs_Headshot_2010-CROP2.jpg/220px-Steve_Jobs_Headshot_2010-CROP2.jpg',
    first: 'Steve',
    last: 'Jobs',
  },
  {
    avatar:
      'https://gss1.bdstatic.com/9vo3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D400/sign=9023f9aa6f09c93d07f20ff7af3cf8bb/7a899e510fb30f241b935fa7c095d143ad4b030c.jpg',
    first: 'Jun',
    last: 'Lei',
  },
  {
    avatar:
      'https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=0003b03088b1cb133e693b15e56f3173/0bd162d9f2d3572c257447038f13632763d0c35f.jpg',
    first: 'Jack',
    last: 'Ma',
  },
  {
    avatar: 'https://chine.in/usb/images/2016/115372_201402261621251jc64.jpg',
    first: 'Pony',
    last: 'Ma',
  },
  {
    avatar:
      'https://www.thehindu.com/news/national/article20493061.ece/alternates/FREE_300/17THGATES1',
    first: 'Bill',
    last: 'Gates',
  },
  {
    avatar:
      'https://fortunedotcom.files.wordpress.com/2015/03/9826_01_0153.jpg',
    first: 'Tim',
    last: 'Cook',
  },
  {
    avatar:
      'https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=d6d431bf9aef76c6d0d2fc2da52d9ac7/2f738bd4b31c8701928251782d7f9e2f0708ff7c.jpg',
    first: 'YanHong',
    last: 'Li',
  },
];

class Test extends React.Component {
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
        return 1;
      },
      (type, dim) => {
        dim.width = width / 4.2;
        dim.height = 200;
      }
    );

    this._rowRenderer = this._rowRenderer.bind(this);

    //Since component should always render once data has changed, make data provider part of the state
    this.state = {
      dataProvider: dataProvider.cloneWithRows(TempData),
      isVisiable: false,
    };
  }
  _generateArray(n) {
    let arr = new Array(n);
    for (let i = 0; i < n; i++) {
      arr[i] = i;
    }
    return arr;
  }

  //Given type and data return the view component
  _rowRenderer(type, data, index) {
    //You can return any view here, CellContainer has no special significance
    return (
      <View
        style={{
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Image
          source={{uri: data.avatar}}
          style={{
            width: 64,
            height: 64,
            borderRadius: 32,
          }}
        />
        <View
          style={{flexDirection: 'column', alignItems: 'center', marginTop: 8}}>
          <Text>{data.first}</Text>
          <Text>{data.last}</Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={{backgroundColor: 'white'}}>
        <List.Item
          title="Category"
          onPress={() => this.setState({isVisiable: true})}
        />
        <Modal
          isVisible={this.state.isVisiable}
          hasHandle
          style={{margin: 0, justifyContent: 'flex-end'}}
          renderHandle={() => (
            <Handle
              isClose
              onPress={() => this.setState({isVisiable: false})}
            />
          )}
          onSwipe={() => this.setState({isVisiable: false})}
          swipeDirection="down">
          <View>
            <View style={{backgroundColor: 'white', paddingBottom: 16}}>
              <JobListItem
                timestamp={Date.now()}
                title="Back end Developer"
                location="Auckland"
                minimum_pay={40000}
                maximum_pay={50000}
              />
            </View>
            <View style={{height: 200, backgroundColor: 'white'}}>
              <RecyclerListView
                scrollViewProps={{
                  showsHorizontalScrollIndicator: false,
                }}
                isHorizontal={true}
                layoutProvider={this._layoutProvider}
                dataProvider={this.state.dataProvider}
                rowRenderer={this._rowRenderer}
              />;
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

@connect()
class Account extends React.Component {
  gotoSeeker = () => {
    this.props.dispatch({type: 'gotoSeeker'});
  };

  render() {
    return (
      <View>
        <Header
          title={<Header.LargeTitle>Post a job</Header.LargeTitle>}
          rightButton={[
            <EasyTap>
              <Ionicons name="ios-add" size={24} color="white" />
            </EasyTap>,
          ]}
        />
      </View>
    );
  }
}

export default Page({
  tabBarIcon: ({focused}) => (
    <View style={{marginTop: 8}}>
      <Entypo name="user" size={24} color={focused ? Theme : '#abb0b0'} />
    </View>
  ),
  tabBarOnPress: ({defaultHandler}) => {
    defaultHandler();
    StatusBar.setBarStyle('light-content', true);
  },
  tabBarLabel: 'Post a job',
})(Account);
