/*eslint-disable */
import React from 'react';
import {Debugger} from '../../utils/logger';
const CreateFetcher = (
  url = 'http://18.222.175.208',
  body,
  mapStateToProps
) => {
  return Cpn =>
    class Wrapper extends React.PureComponent {
      state = {
        fetchData: null,
        error: null,
        loading: true,
      };

      async fetcher() {
        try {
          Debugger.log('发起请求');
          const fetchPromise = fetch(url, {
            method: 'POST',
            body: JSON.stringify({param: body}),
            headers: {
              'Content-Type': 'application/x-www-form-urlencode',
            },
          });

          const res = await fetchPromise;
          const json = await res.json();
          Debugger.log(json.data);
          this.setState({
            fetchData: json.data,
            loading: false,
          });
        } catch (e) {
          this.setState({
            error: e,
            loading: false,
          });
        }
      }

      componentDidMount() {
        this.fetcher();
      }

      render() {
        return <Cpn {...this.props} {...mapStateToProps(this.state)} />;
      }
    };
};

export default CreateFetcher;
