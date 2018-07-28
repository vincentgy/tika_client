import React from 'react';
import {Modal, View, Text, TouchableOpacity, Picker} from 'react-native';
import {WIDTH} from '../../utils/plaform';

export default class ModalPicker extends React.Component {
  static defaultProps = {
    row: 2,
    data: {0: [], 1: []},
  };

  state = {
    modalVisible: true,
  };

  setModalVisible = modalVisible => {
    this.setState({
      modalVisible,
    });
  };

  forRenderProps = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
    });
  };

  render() {
    return (
      <React.Fragment>
        {this.props.children(this.forRenderProps, this.props)}
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => this.setModalVisible(false)}>
          <View>
            <View style={{height: '55%', backgroundColor: 'rgba(0,0,0,0.6)'}} />
            <View style={{height: '45%', backgroundColor: 'white'}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  borderBottomWidth: 1,
                  borderBottomColor: 'rgba(120,120,120,0.1)',
                }}>
                <TouchableOpacity
                  onPress={() => this.setModalVisible(false)}
                  style={{padding: 16}}>
                  <Text
                    style={{fontWeight: '900', color: '#a0b0b0', fontSize: 16}}>
                    取消
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.setModalVisible(false)}
                  style={{padding: 16}}>
                  <Text
                    style={{fontWeight: '900', color: '#0077FF', fontSize: 16}}>
                    确定
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Picker
                  // selectedValue={this.state.language}
                  style={{
                    width: WIDTH / 2,
                  }}>
                  <Picker.Item label="Java" value="java" />
                  <Picker.Item label="JavaScript" value="js" />
                  <Picker.Item label="JavaScript" value="js" />
                  <Picker.Item label="JavaScript" value="js" />
                  <Picker.Item label="JavaScript" value="js" />
                  <Picker.Item label="JavaScript" value="js" />
                  <Picker.Item label="JavaScript" value="js" />
                  <Picker.Item label="JavaScript" value="js" />
                  <Picker.Item label="JavaScript" value="js" />
                  <Picker.Item label="JavaScript" value="js" />
                </Picker>
                <Picker
                  // selectedValue={this.state.language}
                  style={{
                    width: WIDTH / 2,
                  }}>
                  <Picker.Item label="Java" value="java" />
                  <Picker.Item label="JavaScript" value="js" />
                  <Picker.Item label="JavaScript" value="js" />
                  <Picker.Item label="JavaScript" value="js" />
                  <Picker.Item label="JavaScript" value="js" />
                  <Picker.Item label="JavaScript" value="js" />
                  <Picker.Item label="JavaScript" value="js" />
                  <Picker.Item label="JavaScript" value="js" />
                  <Picker.Item label="JavaScript" value="js" />
                  <Picker.Item label="JavaScript" value="js" />
                </Picker>
              </View>
            </View>
          </View>
        </Modal>
      </React.Fragment>
    );
  }
}
