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
  color: #0077ff;
  font-size: 16px;
`;

export default class DataPicker extends React.Component {
  constructor(props) {
    super(props);

    const year = [];
    for (let index = 2000; index < 2020; index++) {
      year.push(index);
    }

    this.state = {
      month: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'June',
        'July',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      year: year,
      modalVisible: false,
      selectedMonth: 'Jan',
      selectedYear: 2017,
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
                <TouchableOpacity
                  onPress={() => {
                    this.props.onComfirm &&
                      this.props.onComfirm(
                        this.state.selectedMonth,
                        this.state.selectedYear
                      );
                    this.setModalVisible(false);
                  }}
                  style={{padding: 16}}>
                  <StyledText>Comfirm</StyledText>
                </TouchableOpacity>
              </ButtonGroup>
              <View style={{flexDirection: 'row'}}>
                <PickerCompat
                  selectedValue={this.state.selectedMonth}
                  onValueChange={value => {
                    this.props.onValueChange && this.props.onValueChange(value);
                    this.setState({
                      selectedMonth: value,
                    });
                  }}
                  style={{width: WIDTH / 2}}>
                  {this.state.month.map((item, index) => (
                    <Picker.Item key={index} label={item + ''} value={item} />
                  ))}
                </PickerCompat>
                <PickerCompat
                  selectedValue={this.state.selectedYear}
                  onValueChange={value => {
                    this.props.onValueChange && this.props.onValueChange(value);
                    this.setState({
                      selectedYear: value,
                    });
                  }}
                  style={{width: WIDTH / 2}}>
                  {this.state.year.map((item, index) => (
                    <Picker.Item key={index} label={item + ''} value={item} />
                  ))}
                </PickerCompat>
              </View>
            </ModalInside>
          </View>
        </Modal>
      </React.Fragment>
    );
  }
}
