import React from 'react';
import {View, Text, TouchableOpacity, Picker, Platform} from 'react-native';
import {WIDTH} from '../../utils/plaform';
import styled from 'styled-components';
import PickerAndroid from 'react-native-wheel-picker';
import Modal from '../react-native-modal';

const PickerCompat = Platform.OS === 'ios' ? Picker : PickerAndroid;
const PickerItem = Platform.OS === 'ios' ? Picker.Item : PickerAndroid.Item;

const Placeholder = styled.View`
  height: 55%;
`;

const ModalInside = styled.View`
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
      <View style={{backgroundColor: 'white'}}>
        {this.props.children(this.forRenderProps, this.props, [
          // 因为安卓的 value 只支持数字
          //https://github.com/lesliesam/react-native-wheel-picker/issues/14
          Platform.OS === 'ios'
            ? this.state.selectedMonth
            : this.state.month[this.state.selectedMonth] || 'Jan',
          this.state.selectedYear,
        ])}
        <Modal
          style={{margin: 0, justifyContent: 'flex-end'}}
          swipeDirection="down"
          renderHandle={() => (
            <View style={{height: 32, backgroundColor: 'red'}} />
          )}
          onSwipe={() => this.setModalVisible(false)}
          isVisible={this.state.modalVisible}
          onBackdropPress={() => this.setModalVisible(false)}
          onRequestClose={() => this.setModalVisible(false)}>
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
                      //安卓因为value 必须是数字
                      Platform.OS === 'ios'
                        ? this.state.selectedMonth
                        : this.state.month[this.state.selectedMonth],
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
                itemStyle={{
                  color: 'black',
                  fontSize: 18,
                  height: 145,
                }}
                selectedValue={this.state.selectedMonth}
                onValueChange={value => {
                  //安卓因为value 必须是数字
                  const Value =
                    Platform.OS === 'ios' ? value : this.state.month[value];
                  this.props.onValueChange && this.props.onValueChange(Value);
                  this.setState({
                    selectedMonth: value,
                  });
                }}
                style={{width: WIDTH / 2, height: 250}}>
                {this.state.month.map((item, index) => (
                  <PickerItem
                    key={index}
                    label={item + ''}
                    //安卓因为value 必须是数字
                    value={Platform.OS === 'ios' ? item : index}
                  />
                ))}
              </PickerCompat>
              <PickerCompat
                itemStyle={{
                  color: 'black',
                  fontSize: 18,
                  height: 145,
                }}
                selectedValue={this.state.selectedYear}
                onValueChange={value => {
                  this.props.onValueChange && this.props.onValueChange(value);
                  this.setState({
                    selectedYear: value,
                  });
                }}
                style={{width: WIDTH / 2, height: 250}}>
                {this.state.year.map((item, index) => (
                  <PickerItem key={index} label={item + ''} value={item} />
                ))}
              </PickerCompat>
            </View>
          </ModalInside>
        </Modal>
      </View>
    );
  }
}
