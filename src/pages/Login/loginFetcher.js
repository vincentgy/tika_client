import React from 'react';
import {Post} from '../../utils/url';

export const Loader = Cpn => {
  return class wrapper extends React.Component {
    state = {
      loading: false,
      fetchData: null,
    };

    HandleFetch = body => {
      this.setState({
        loading: true,
      });
      Post(body).then(res => {
        this.setState({
          loading: false,
          fetchData: res,
        });
      });
    };

    render() {
      return <Cpn {...this.state} HandleFetch={this.HandleFetch} />;
    }
  };
};
