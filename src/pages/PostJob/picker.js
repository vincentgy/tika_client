import React from 'react';
import {View} from 'react-native';

import List from '../../components/List';
import CreateFetcher from '../../components/CreateFetcher';

class Picker extends React.Component {
  render() {
    if (this.props.loading === true) return null;

    return (
      <View>
        <List>
          {/* {this.props.data.map(d => {
            return <List.Item key={d.id} title={d.name} />;
          })} */}
        </List>
      </View>
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

export default CreateFetcher(undefined, {a: 'ld'}, mapState)(Picker);
