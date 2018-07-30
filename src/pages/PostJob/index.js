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

const Item = List.Item;

@withNavigation
@Page({title: 'Post a Job'})
class PostJob extends React.Component {
  render() {
    const action = payload => {
      this.props.dispatch({type: 'ChangeCurrentField', payload});
      this.props.navigation.navigate('Edit');
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
          <Item
            key="1"
            title="Job Type"
            onPress={() => {
              this.props.dispatch({
                type: 'ChangeCurrentField',
                payload: 'type',
              });
              this.props.navigation.navigate('Picker');
            }}
            desc={this.props.type}
          />
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
          <ModalFetcher>
            {(startFetch, res) => (
              <ModalPicker
                onComfirm={value => {
                  const values = res.find(item => item.name === value[1]);
                  Debugger.log(values);
                  this.props.dispatch({type: 'EditRegion', payload: values});
                }}
                onValueChange={(value, type) => {
                  Debugger.log(type);
                  const id = PayRange.region.findIndex(i => i.value === value);
                  // we checking type with 0
                  // means `0` is when region change
                  // not `district`
                  if (type === '0') startFetch({a: 'ld', r: id});
                }}
                data={{
                  0: PayRange.region.map(i => ({...i, type: 'region'})),
                  1:
                    (res && res.map(i => ({label: i.name, value: i.name}))) ||
                    [],
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
                    desc={this.props.region}
                  />
                )}
              </ModalPicker>
            )}
          </ModalFetcher>
          <Item
            key="3"
            title="Location"
            desc={this.props.location}
            onPress={() => action('location')}
          />
        </List>
        <List>
          <Item
            key="1"
            title="Pay Type"
            onPress={() => {
              this.props.dispatch({
                type: 'ChangeCurrentField',
                payload: 'payType',
              });
              this.props.navigation.navigate('Picker');
            }}
            desc={this.props.payType}
          />
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
                    location: '325 east coast road',
                    pay_type: 2,
                    number: 1,
                    categories: 1,
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
