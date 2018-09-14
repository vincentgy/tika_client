import React from 'react';
import {Button} from 'react-native-elements';
import {connect} from 'react-redux';
import {Page} from '../../components/PageHOC';
import {Entypo} from '../../components/Icons';
import {Theme} from '../../utils/color';
import Header from '../../components/Header';
import List from '../../components/List';
import Modal from '../../components/react-native-modal';
import Handle from '../../components/Handle';

import {View, Text, Dimensions, Image} from 'react-native';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';
import {WIDTH} from '../../utils/plaform';
import JobListItem from '../../public/JobListItem';

const TempData = [
  'https://cms.qz.com/wp-content/uploads/2018/08/RTX4RKWN-e1533787363757.jpg?quality=75&strip=all&w=410&h=232',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Steve_Jobs_Headshot_2010-CROP2.jpg/220px-Steve_Jobs_Headshot_2010-CROP2.jpg',
  'https://gss1.bdstatic.com/9vo3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D400/sign=9023f9aa6f09c93d07f20ff7af3cf8bb/7a899e510fb30f241b935fa7c095d143ad4b030c.jpg',
  'https://s3.amazonaws.com/skinner-production/stories/display_images/000/022/885/large/16345010151_9af1358b60_o.jpg?1517862944',
  'https://chine.in/usb/images/2016/115372_201402261621251jc64.jpg',
  'https://www.thehindu.com/news/national/article20493061.ece/alternates/FREE_300/17THGATES1',
  'https://fortunedotcom.files.wordpress.com/2015/03/9826_01_0153.jpg',
  'http://n.sinaimg.cn/finance/transform/20160115/cYMT-fxnqriz9695881.jpg',
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
      dataProvider: dataProvider.cloneWithRows(this._generateArray(300)),
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
          source={{uri: TempData[index % 8]}}
          style={{
            width: 64,
            height: 64,
            borderRadius: 32,
          }}
        />
        <View
          style={{flexDirection: 'column', alignItems: 'center', marginTop: 8}}>
          <Text>Jack</Text>
          <Text>ma</Text>
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
        <Header />
        <Test />
        <Button title="go to seeker" onPress={this.gotoSeeker} />
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
    StatusBar.setBarStyle('dark-content', true);
  },
  tabBarLabel: 'Account',
})(Account);
