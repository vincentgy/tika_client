import React from 'react';
import {Modal} from 'react-native';
import {Debugger} from '../../utils/logger';
import {Loading} from '../Loading';

export default class ModalFetcher extends React.Component {
  state = {
    modalVisible: false,
    fetchData: null,
  };

  static defaultProps = {
    url: 'http://18.222.175.208',
  };

  startFetch = body => {
    this.setState({
      modalVisible: true,
    });

    fetch(this.props.url, {
      method: 'POST',
      body: JSON.stringify({param: body}),
      headers: {
        'Content-Type': 'application/x-www-form-urlencode',
      },
    })
      .then(res => res.json())
      .then(json => {
        Debugger.log(json);
        this.setState({
          fetchData: json.data,
          modalVisible: false,
        });
      })
      .catch(e => {
        Debugger.log(e);
      });
  };

  render() {
    return (
      <React.Fragment>
        {this.props.children(this.startFetch, this.state.fetchData)}
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() =>
            this.setState({
              modalVisible: false,
            })
          }>
          <Loading size={60} color="#2D59D9" type="Pulse" />
        </Modal>
      </React.Fragment>
    );
  }
}
