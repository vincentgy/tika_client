import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Picker,
  Platform,
} from 'react-native';
import {WIDTH} from '../../utils/plaform';
import styled from 'styled-components';
import produce from 'immer';

const PickerCompat = Picker;

const Placeholder = styled.View`
  height: 55%;
`;

const ModalInside = styled.View`
  height: 45%;
  background-color: white;
`;

const ButtonGroup = styled.View`
  border-top-width: 1px;
  border-top-color: rgba(120, 120, 120, 0.1);
  flex-direction: row;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-color: rgba(120, 120, 120, 0.1);
`;

const StyledText = styled.Text`
  font-weight: 900;
  color: #0077ff;
  font-size: 16px;
`;

export default class DataPicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      month: [],
      year: [],
      modalVisible: false,
    };
  }

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
            <Placeholder />
            <ModalInside>
              <ButtonGroup>
                <TouchableOpacity
                  onPress={() => this.setModalVisible(false)}
                  style={{padding: 16}}>
                  <StyledText>Cancel</StyledText>
                </TouchableOpacity>
                <Text
                  style={{
                    padding: 16,
                    fontWeight: '900',
                    color: '#a0b0b0',
                    fontSize: 16,
                  }}>
                  {this.props.title}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    this.props.onComfirm &&
                      this.props.onComfirm(this.state.value);
                    this.setModalVisible(false);
                  }}
                  style={{padding: 16}}>
                  <StyledText>Comfirm</StyledText>
                </TouchableOpacity>
              </ButtonGroup>
              <View style={{flexDirection: 'row'}}>
                {/* {this.state.month.map((key, idx) => (
                  <PickerCompat
                    selectedValue={this.state.value[idx]}
                    onValueChange={value => {
                      this.props.onValueChange &&
                        this.props.onValueChange(value, key);
                      this.setState({
                        value: produce(this.state.value, draft => {
                          draft[idx] = value;
                        }),
                      });
                    }}
                    key={key}
                    style={{
                      width: WIDTH / this.props.row,
                    }}>
                    {this.props.data[key].map((item, index) => (
                      <PickerItem
                        key={index}
                        label={item.label}
                        value={item.value}
                      />
                    ))}
                  </PickerCompat>
                ))} */}
              </View>
            </ModalInside>
          </View>
        </Modal>
      </React.Fragment>
    );
  }
}
