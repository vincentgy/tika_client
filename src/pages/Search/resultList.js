//https://github.com/Flipkart/recyclerlistview/blob/21049cc89ad606ec9fe8ea045dc73732ff29eac9/src/core/RecyclerListView.tsx#L540-L634

/***
 Use this component inside your React Native Application.
 A scrollable list with different item type
 */
import React from 'react';

import JobListTemplate from '../../public/JobListPage';
import {Entypo} from '../../components/Icons';
import {connect} from 'react-redux';

const List = props => {
  console.log(props);

  return (
    <JobListTemplate
      componentDidMount={() => {
        const searchText = props.navigation.state.params.searchText;
        props.dispatch({type: 'SearchJob', payload: searchText});
      }}
      {...props}
      leftButton={[
        <Entypo
          size={16}
          color="white"
          key={0}
          name="chevron-thin-left"
          onPress={() => props.navigation.goBack()}
        />,
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
