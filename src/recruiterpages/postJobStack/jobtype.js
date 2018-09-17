import React from 'react';
import TimixForm from '../../components/TimixForm';
import Header from '../../components/Header';
import {View} from 'react-native';
import {NextBottom} from './nextButton';
import {Auto, Put} from '../../store';
import SelectItem from '../../public/SelectItem';
import Picker from 'react-native-wheel-picker';
import {WIDTH, HEIGHT} from '../../utils/plaform';
import {EasyTap} from '../../public/EasyTap';
import {Entypo} from '../../components/Icons';
import {Title} from './title';

const TypeInStore = Auto(state => state.createJob.JobType);

const paymentType = {
  'Full time': [
    10000,
    15000,
    20000,
    25000,
    30000,
    35000,
    40000,
    45000,
    50000,
    55000,
    60000,
    65000,
    70000,
    75000,
    80000,
    85000,
    90000,
    100000,
    110000,
    120000,
    130000,
    140000,
    150000,
    200000,
    300000,
  ],
  'Part time': [
    10,
    15,
    20,
    25,
    30,
    35,
    40,
    45,
    50,
    60,
    70,
    80,
    90,
    100,
    110,
    120,
    130,
    140,
    150,
    200,
    300,
    400,
    500,
    1000,
  ],
  'One off': [
    100,
    200,
    300,
    400,
    500,
    600,
    700,
    800,
    900,
    1000,
    2000,
    3000,
    4000,
    5000,
    6000,
    7000,
    8000,
    9000,
  ],
};

export default class JobType extends React.Component {
  onTypeChange = type => {
    Put(state => {
      state.createJob.JobType.type = type;
    });
  };

  /**
   * 价格最小值
   */
  onMinValueChange = value => {
    Put(state => {
      state.createJob.JobType.min = value;
    });
  };

  /**
   * 价格最大值
   */
  onMaxValueChange = value => {
    Put(state => {
      state.createJob.JobType.max = value;
    });
  };

  renderPicker = state => {
    if (state.type === 'Full time') {
      return (
        <View style={{flexDirection: 'row'}}>
          <Picker
            style={{width: WIDTH / 2}}
            selectedValue={state.min}
            onValueChange={this.onMinValueChange}>
            {paymentType[state.type].map(item => (
              <Picker.Item key={item} value={item} label={`$${item / 1000}k`} />
            ))}
          </Picker>
          <Picker
            style={{width: WIDTH / 2}}
            selectedValue={state.max}
            onValueChange={this.onMaxValueChange}>
            {paymentType[state.type].map(item => (
              <Picker.Item key={item} value={item} label={`$${item / 1000}k`} />
            ))}
          </Picker>
        </View>
      );
    }
    if (state.type === 'Part time' || state.type === 'Contract') {
      return (
        <Picker onValueChange={this.onMinValueChange} selectedValue={state.min}>
          {paymentType['Part time'].map(item => (
            <Picker.Item key={item} value={item} label={`$${item}/h`} />
          ))}
        </Picker>
      );
    }
    if (state.type === 'One off') {
      return (
        <Picker onValueChange={this.onMinValueChange} selectedValue={state.min}>
          {paymentType[state.type].map(item => (
            <Picker.Item key={item} value={item} label={`$${item}`} />
          ))}
        </Picker>
      );
    }

    return null;
  };

  render() {
    return (
      <React.Fragment>
        <Header
          title={
            <View>
              <Header.LargeTitle>Create job: Job Type</Header.LargeTitle>
              <Header.Title>Step 3 of 4</Header.Title>
            </View>
          }
          leftButton={[
            <EasyTap key={0} onPress={() => this.props.navigation.goBack()}>
              <Entypo size={16} color="white" name="chevron-thin-left" />
            </EasyTap>,
          ]}
        />
        <View style={{height: HEIGHT - 40 - 76}}>
          <Title text="JOB TYPE" />
          {TypeInStore(state => {
            return (
              <React.Fragment>
                <View style={{backgroundColor: 'white'}}>
                  {['Full time', 'Part time', 'Contract', 'One off'].map(
                    (item, index) => {
                      return (
                        <SelectItem
                          onPress={() => this.onTypeChange(item)}
                          key={index}
                          active={item === state.type}>
                          {item}
                        </SelectItem>
                      );
                    }
                  )}
                </View>
                <Title text="PAY TYPE" />
                <View style={{backgroundColor: 'white'}}>
                  {this.renderPicker(state)}
                </View>
              </React.Fragment>
            );
          })}
        </View>
        <NextBottom goto="Location" {...this.props} />
      </React.Fragment>
    );
  }
}
