import React from 'react';

import List from '../../components/List';
import CreateFetcher from '../../components/CreateFetcher';
import PageBase from '../../components/PageBase';

class Picker extends React.Component {
  render() {
    if (this.props.loading === true) return null;

    return (
      <PageBase>
        <List>
          {this.props.data.map(d => {
            return <List.Item key={d.id} title={d.name} />;
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

export default CreateFetcher(undefined, {a: 'jc'}, mapState)(Picker);
