import React from 'react';
import {View} from 'react-native';
import {Page} from '../../components/PageHOC';

import List from '../../components/List';
import {Button} from 'react-native-elements';
import {withNavigation} from 'react-navigation';
import {connect} from 'react-redux';
import PageBase from '../../components/PageBase';
import ModalPicker from '../../components/ModalPicker';
import {payRange} from './config';

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
          <ModalPicker title="Region" key="1">
            {(openCallback, props) => (
              <Item
                style={props.style}
                title="Region"
                onPress={() => openCallback()}
                desc={this.props.region}
              />
            )}
          </ModalPicker>
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
              0: payRange,
              1: payRange,
            }}
            title="Pay Range"
            key="2">
            {(openCallback, props) => (
              <Item
                onPress={() => openCallback()}
                key="2"
                style={props.style}
                title="Pay Range"
                desc={this.props.payRange}
              />
            )}
          </ModalPicker>
        </List>
        <View style={{marginTop: 8, marginBottom: 8}}>
          <Button title="Post a job" backgroundColor="#2D59D9" />
        </View>
      </PageBase>
    );
  }
}

export default connect(state => ({...state.postJob}))(PostJob);
