import React from 'react';

import List from '../../components/List';
import CreateFetcher from '../../components/CreateFetcher';
import PageBase from '../../components/PageBase';
import {Loading} from '../../components/Loading';
import {connect} from 'react-redux';

@connect()
class Picker extends React.Component {
  render() {
    if (this.props.loading) return <Loading />;

    return (
      <PageBase>
        <List>
          {this.props.data.map(d => {
            return (
              <List.Item
                desc="choose"
                onPress={() => {
                  this.props.dispatch({
                    type: 'EditPostJob',
                    payload: d.name,
                  });
                  this.props.navigation.goBack(null);
                }}
                key={d.id}
                title={d.name}
              />
            );
          })}
        </List>
      </PageBase>
    );
  }
}

const mapState = state => {
  return {
    data: state.fetchData,
    error: state.error,
    loading: state.loading,
  };
};

export default CreateFetcher(undefined, {a: 'jpt'}, mapState)(Picker);
