import React from 'react';
import {View} from 'react-native';
import {Page} from '../../components/PageHOC';

import List from '../../components/List';
import {Button} from 'react-native-elements';
import {withNavigation} from 'react-navigation';
import {connect} from 'react-redux';
import PageBase from '../../components/PageBase';
import ModalPicker from '../../components/ModalPicker';
import ModalFetcher from '../../components/ModalFetcher';
import PayRange from './config';
import {Debugger} from '../../utils/logger';
import {Regions, Disctrict} from './area';
import PropsSelector from '../../components/PropsSelector';

const Item = List.Item;

@withNavigation
@Page({title: 'Post a Job'})
class PostJob extends React.Component {
  render() {
    const action = payload => {
      this.props.dispatch({type: 'ChangeCurrentField', payload});
      this.props.navigation.navigate('Edit');
    };

    const getDisctrictAry = key => {
      return Disctrict[key].map(i => ({label: i.name, value: i.name}));
    };

    return (
      <PageBase hasStatusBar>
        <List>
          <Item
            key="1"
            title="Company"
            desc={this.props.company}
            onPress={() => action('company')}
          />
          <Item
            key="2"
            title="Number"
            desc={this.props.number}
            onPress={() => action('number')}
          />
        </List>
        <List>
          <ModalPicker
            row={1}
            onComfirm={value => {
              Debugger.log(value);
              this.props.dispatch({
                type: 'EditPostJob',
                payload: value,
              });
            }}
            data={{
              0: PayRange.jobType.map(i => ({label: i.name, value: i.name})),
            }}>
            {(openCallback, props) => (
              <Item
                style={props.style}
                key="1"
                title="Job Type"
                onPress={() => {
                  this.props.dispatch({
                    type: 'ChangeCurrentField',
                    payload: 'type',
                  });
                  openCallback();
                }}
                desc={this.props.type}
              />
            )}
          </ModalPicker>
          <Item
            key="2"
            title="Job Title"
            desc={this.props.title}
            onPress={() => action('title')}
          />
          <Item
            key="3"
            title="Categories"
            onPress={() => {
              this.props.dispatch({
                type: 'ChangeCurrentField',
                payload: 'categories',
              });
              this.props.navigation.navigate('Picker');
            }}
            desc={this.props.categories}
          />
        </List>
        <List>
          <PropsSelector>
            {(data, select) => (
              <ModalPicker
                onComfirm={value => {
                  // Debugger.log(values);
                  this.props.dispatch({
                    type: 'EditPlace',
                    payload: {
                      region: value[0],
                      district: value[1],
                    },
                  });
                }}
                onValueChange={(value, type) => {
                  const region = Regions.find(i => i.region === value);
                  // we checking type with 0
                  // means `0` is when region change
                  // not `district`
                  if (type === '0' && region.id) {
                    Debugger.log(Disctrict[region.id]);
                    const district = getDisctrictAry(region.id);
                    select(district);
                  }
                }}
                data={{
                  0: Regions.map(r => ({label: r.region, value: r.region})),
                  1: data || getDisctrictAry('1'),
                }}
                title="Region"
                key="1">
                {(openCallback, props) => (
                  <Item
                    style={props.style}
                    title="Region"
                    onPress={() => {
                      this.props.dispatch({
                        type: 'ChangeCurrentField',
                        payload: 'region',
                      });
                      openCallback();
                    }}
                    desc={this.props.region + this.props.district}
                  />
                )}
              </ModalPicker>
            )}
          </PropsSelector>
          <Item
            key="3"
            title="Location"
            desc={this.props.location}
            onPress={() => action('location')}
          />
        </List>
        <List>
          <ModalPicker
            row={1}
            onComfirm={value => {
              Debugger.log(value[0]);
              this.props.dispatch({
                type: 'EditPostJob',
                payload: value[0],
              });
            }}
            data={{
              0: PayRange.payType.map(i => ({label: i.name, value: i.name})),
            }}>
            {(openCallback, props) => (
              <Item
                style={props.style}
                key="1"
                title="Pay Type"
                onPress={() => {
                  this.props.dispatch({
                    type: 'ChangeCurrentField',
                    payload: 'payType',
                  });
                  openCallback();
                }}
                desc={this.props.payType}
              />
            )}
          </ModalPicker>
          <ModalPicker
            data={{
              0: PayRange[this.props.payType ? this.props.payType : 'hourly'],
              1: PayRange[this.props.payType ? this.props.payType : 'hourly'],
            }}
            onComfirm={value => {
              const values = `${value[0]}~${value[1]}`;
              this.props.dispatch({type: 'EditPostJob', payload: values});
            }}
            title="Pay Range"
            key="2">
            {(openCallback, props) => (
              <Item
                onPress={() => {
                  this.props.dispatch({
                    type: 'ChangeCurrentField',
                    payload: 'payRange',
                  });
                  openCallback();
                }}
                key="2"
                style={props.style}
                title="Pay Range"
                desc={this.props.payRange}
              />
            )}
          </ModalPicker>
        </List>
        <View style={{marginTop: 8, marginBottom: 8}}>
          <ModalFetcher>
            {startFetch => (
              <Button
                title="Post a job"
                backgroundColor="#2D59D9"
                onPress={() => {
                  startFetch({
                    a: 'pj',
                    title: this.props.title,
                    company: this.props.company,
                    user_id: '3',
                    type: 1,
                    minimum_pay: 10000,
                    maximum_pay: 20000,
                    region_id: this.props.region_id,
                    district_id: this.props.district_id,
                    location: this.props.location,
                    pay_type: PayRange.payType.find(
                      i => i.name === this.props.payType
                    ).id,
                    number: 1,
                    categories: this.props.categories_id,
                  });
                }}
              />
            )}
          </ModalFetcher>
        </View>
      </PageBase>
    );
  }
}

export default connect(state => ({...state.postJob}))(PostJob);
