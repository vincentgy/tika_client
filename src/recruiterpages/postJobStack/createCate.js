import React from 'react';

import {View, Text, Dimensions, Image, TouchableOpacity} from 'react-native';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';
import JobListItem from '../../public/JobListItem';
import {EasyTap} from '../../public/EasyTap';
import Header from '../../components/Header';
import {WIDTH, HEIGHT} from '../../utils/plaform';
import {NetworkManager} from '../../manager/networkManager';
import SelectItem from '../../public/SelectItem';
import LinearGradient from 'react-native-linear-gradient';
import {NextBottom} from './nextButton';

export default class Test extends React.Component {
  constructor(args) {
    super(args);

    let {width} = Dimensions.get('window');

    //Create the data provider and provide method which takes in two rows of data and return if those two are different or not.
    //THIS IS VERY IMPORTANT, FORGET PERFORMANCE IF THIS IS MESSED UP
    let dataProvider = new DataProvider((r1, r2) => {
      console.log(r1, r2);
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
        dim.width = width;
        dim.height = 48;
      }
    );

    this._rowRenderer = this._rowRenderer.bind(this);

    //Since component should always render once data has changed, make data provider part of the state
    this.state = {
      dataProvider: dataProvider.cloneWithRows([]),
      isVisiable: false,
    };
  }

  async FetchCate() {
    const manager = new NetworkManager();
    const json = await manager.getCategory();

    const newCate = json.data.map(item => {
      return {...item, isSelected: false};
    });

    this.setState({
      dataProvider: this.state.dataProvider.cloneWithRows(newCate),
    });
  }

  componentDidMount() {
    this.FetchCate();
  }

  //Given type and data return the view component
  _rowRenderer(type, data, index) {
    //You can return any view here, CellContainer has no special significance
    return (
      <SelectItem
        active={data.isSelected}
        onPress={() => {
          const datas = this.state.dataProvider._data.map(item => {
            if (item.id === data.id) {
              if (data.isSelected) return {...item, isSelected: false};
              else return {...item, isSelected: true};
            }
            return item;
          });
          this.setState({
            dataProvider: this.state.dataProvider.cloneWithRows(datas),
          });
        }}>
        {data.name}
      </SelectItem>
    );
  }

  render() {
    return (
      <View style={{backgroundColor: 'white', width: WIDTH, height: HEIGHT}}>
        <Header
          title={
            <View>
              <Header.LargeTitle>Create job: Category</Header.LargeTitle>
              <Header.Title>Step 1 of 4</Header.Title>
            </View>
          }
        />
        <RecyclerListView
          layoutProvider={this._layoutProvider}
          dataProvider={this.state.dataProvider}
          rowRenderer={this._rowRenderer}
        />
        <NextBottom goto="Description" {...this.props} />
      </View>
    );
  }
}
