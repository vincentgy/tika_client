//https://github.com/Flipkart/recyclerlistview/blob/21049cc89ad606ec9fe8ea045dc73732ff29eac9/src/core/RecyclerListView.tsx#L540-L634

/***
 Use this component inside your React Native Application.
 A scrollable list with different item type
 */
import React from 'react';
import {Text} from 'react-native';

import {EvilIcons} from '../../components/Icons';

import JobListTemplate, {Search} from '../../public/JobListPage';
import {connect} from 'react-redux';

const List = props => {
  return (
    <JobListTemplate
      componentDidMount={() => {
        props.dispatch({
          type: 'queryFilter',
          payload: {name: 'distance', data: 'Whole City'},
        });
      }}
      {...props}
      leftButton={[
        <Text style={{color: 'white', marginLeft: 16}} key="1">
          Job Search
        </Text>,
      ]}
      rightButton={[
        <Search key="1" onPress={() => props.navigation.navigate('SearchJob')}>
          <EvilIcons color={'white'} name="search" size={24} />
        </Search>,
      ]}
    />
  );
};

const mapState = state => {
  return {
    loading: state.filter.loading,
    list: state.filter.list,
  };
};

export default connect(mapState)(List);
