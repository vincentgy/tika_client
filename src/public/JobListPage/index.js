//https://github.com/Flipkart/recyclerlistview/blob/21049cc89ad606ec9fe8ea045dc73732ff29eac9/src/core/RecyclerListView.tsx#L540-L634

/***
 Use this component inside your React Native Application.
 A scrollable list with different item type
 */
import React from 'react';
import {Dimensions, RefreshControl, View, Platform} from 'react-native';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';

import Filter from '../../pages/ModalFilter';
import {WIDTH, HEIGHT} from '../../utils/plaform';

import styled from 'styled-components';
import Header from '../../components/Header';
import {Theme} from '../../utils/color';
import JobListItem from '../JobListItem';

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
    };
  }

  //Given type and data return the view component
  _rowRenderer = (type, data) => {
    return (
      <JobListItem
        {...data}
        onPress={() => this.props.onSelect && this.props.onSelect(data)}
      />
    );
    //You can return any view here, CellContainer has no special significance
  };

  gotoSearch = () => {
    this.props.navigation.navigate('SearchJob');
  };

  render() {
    // const size = this.props.list._size;

    return (
      <View style={{height: HEIGHT - 56 - (Platform.OS === 'ios' ? 0 : 24)}}>
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
          style={{width: WIDTH}}
          layoutProvider={this._layoutProvider}
          dataProvider={this.props.list}
          rowRenderer={this._rowRenderer}
        />
      </View>
    );
  }
}
