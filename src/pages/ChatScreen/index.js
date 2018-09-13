import React from 'react';

import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';
import {WIDTH, HEIGHT} from '../../utils/plaform';
import {View, Text} from 'react-native';
import Header from '../../components/Header';

export default class ChatScreen extends React.Component {
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
        const i = this.state.dataProvider._data[index].length / 32;

        return (parseInt(i) + 1) * 17.5;
      },
      (type, dim) => {
        dim.width = WIDTH;
        dim.height = 100;
      }
    );

    //Since component should always render once data has changed, make data provider part of the state
    this.state = {
      dataProvider: dataProvider.cloneWithRows(this.fake()),
    };
    this.row = [];
  }

  fake = () => {
    return [
      '是是是是是是是是九价的要26岁前打是九价的要26岁前打',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
    ];
  };

  componentDidMount() {
    this.row.forEach(item => {
      console.log(item);
      item.measure((x, y, width, height) => {
        console.log(height);
      });
    });
  }

  //Given type and data return the view component
  _rowRenderer = (type, data, index) => {
    return (
      <View style={{flexDirection: 'row', marginLeft: 8}}>
        <View
          style={{
            maxWidth: (WIDTH * 4) / 5,
            backgroundColor: 'white',
            padding: 8,
            borderRadius: 8,
          }}>
          <Text ref={node => this.row.push(node)}>{data}</Text>
        </View>
      </View>
    );
    //You can return any view here, CellContainer has no special significance
  };

  render() {
    return (
      <React.Fragment>
        <Header />
        <RecyclerListView
          //   scrollViewProps={{}}
          style={{
            height: HEIGHT,
            width: WIDTH,
          }}
          layoutProvider={this._layoutProvider}
          dataProvider={this.state.dataProvider}
          rowRenderer={this._rowRenderer}
        />
      </React.Fragment>
    );
  }
}
