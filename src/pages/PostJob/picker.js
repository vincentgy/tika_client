import React from 'react';

import List from '../../components/List';
import {Fetcher} from '../../components/CreateFetcher';
import PageBase from '../../components/PageBase';
import {connect} from 'react-redux';
// import {Debugger} from '../../utils/logger';

@connect(state => ({currentField: state.postJob.currentField}))
export default class Picker extends React.PureComponent {
  state = {
    type: 'jt',
    payType: 'jpt',
    categories: 'jc',
  };

  render() {
    // Debugger.log(this.props.currentField);
    const {currentField} = this.props;

    const body = {a: this.state[currentField]};

    return (
      <PageBase>
        <Fetcher body={body}>
          {({fetchData}) => (
            <List>
              {fetchData.data.map(d => {
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
          )}
        </Fetcher>
      </PageBase>
    );
  }
}
