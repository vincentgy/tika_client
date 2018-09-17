import React from 'react';

import {View, Dimensions} from 'react-native';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';
import Header from '../../components/Header';
import {WIDTH, HEIGHT} from '../../utils/plaform';
import {NetworkManager} from '../../manager/networkManager';
import SelectItem from '../../public/SelectItem';
import {NextBottom} from './nextButton';
import {Loading} from '../../components/Loading';
import {getStore, Put} from '../../store';
import {Entypo} from '../../components/Icons';
//https://github.com/testshallpass/react-native-dropdownalert
import DropdownAlert from 'react-native-dropdownalert';
import {EasyTap} from '../../public/EasyTap';

export default class Test extends React.Component {
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
        dim.width = width;
        dim.height = 48;
      }
    );

    this._rowRenderer = this._rowRenderer.bind(this);

    //Since component should always render once data has changed, make data provider part of the state
    const store = getStore();
    this.state = {
      dataProvider: dataProvider.cloneWithRows(store.createJob.categories),
      loading: true,
    };
  }

  async FetchCate() {
    if (this.state.dataProvider._size > 0) {
      // 有数据以后不再重复fetch
      this.setState({
        loading: false,
      });
      return;
    }
    const manager = new NetworkManager();
    const json = await manager.getCategory();

    const newCate = json.data.map(item => {
      return {...item, isSelected: false};
    });
    Put(state => {
      state.createJob.categories = newCate;
    });

    this.setState({
      dataProvider: this.state.dataProvider.cloneWithRows(
        getStore().createJob.categories
      ),
      loading: false,
    });
  }

  componentDidMount() {
    this.FetchCate();
  }

  select = data => {
    const datas = getStore().createJob.categories.map(item => {
      if (item.id === data.id) {
        if (data.isSelected) return {...item, isSelected: false};
        else return {...item, isSelected: true};
      }
      return item;
    });
    Put(state => {
      state.createJob.categories = datas;
    });
    this.setState({
      dataProvider: this.state.dataProvider.cloneWithRows(
        getStore().createJob.categories
      ),
    });
  };

  //Given type and data return the view component
  _rowRenderer(type, data, index) {
    //You can return any view here, CellContainer has no special significance
    return (
      <SelectItem active={data.isSelected} onPress={() => this.select(data)}>
        {data.name}
      </SelectItem>
    );
  }

  validAndNext = () => {
    const store = getStore();
    const list = store.createJob.categories.filter(i => {
      if (i.isSelected === true) return i;
    });
    if (list.length < 1) {
      this.dropdown.alertWithType(
        'error',
        'Error',
        'Please select at lease one category'
      );
    } else {
      this.props.navigation.navigate('Description');
    }
  };

  render() {
    return (
      <View
        style={{backgroundColor: 'white', width: WIDTH, height: HEIGHT}}>
        <Header
          title={
            <View>
              <Header.LargeTitle>Create job: Category</Header.LargeTitle>
              <Header.Title>Step 1 of 4</Header.Title>
            </View>
          }
          leftButton={[
            <EasyTap key={0} onPress={() => this.props.navigation.goBack()}>
              <Entypo size={16} color="white" name="chevron-thin-left" />
            </EasyTap>,
          ]}
        />
        {this.state.loading ? (
          <Loading />
        ) : (
          <React.Fragment>
            <RecyclerListView
              layoutProvider={this._layoutProvider}
              dataProvider={this.state.dataProvider}
              rowRenderer={this._rowRenderer}
            />
            <NextBottom onPress={this.validAndNext} />
          </React.Fragment>
        )}
        <DropdownAlert
          showCancel
          updateStatusBar={false}
          closeInterval={1500}
          panResponderEnabled={false}
          zIndex={1000}
          ref={ref => (this.dropdown = ref)}
        />
      </View>
    );
  }
}
