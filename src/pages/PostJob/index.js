import React from 'react';
import {View} from 'react-native';
import {Page} from '../../components/PageHOC';

import List from '../../components/List';
import {Button} from 'react-native-elements';
import {withNavigation} from 'react-navigation';
import {connect} from 'react-redux';
import PageBase from '../../components/PageBase';

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
      <PageBase>
        <List>
          <Item
            key="1"
            title="Company"
            desc={this.props.company}
            onPress={() => action('company')}
          />
        </List>
        <List>
          <Item key="1" title="Job Type" desc={this.props.type} />
          <Item
            key="2"
            title="Job Title"
            desc={this.props.title}
            onPress={() => action('title')}
          />
          <Item
            key="3"
            title="Categories"
            onPress={() => this.props.navigation.navigate('Picker')}
            desc={this.props.categories}
          />
        </List>
        <List>
          <Item
            key="1"
            title="Region"
            onPress={() => this.props.navigation.navigate('Picker')}
            desc={this.props.region}
          />
          <Item key="2" title="District" desc={this.props.district} />
          <Item
            key="3"
            title="Location"
            desc={this.props.location}
            onPress={() => action('location')}
          />
        </List>
        <List>
          <Item key="1" title="Pay Type" desc={this.props.payType} />
          <Item key="2" title="Pay Range" desc={this.props.payRange} />
        </List>
        <View style={{marginTop: 8, marginBottom: 8}}>
          <Button title="Post a job" backgroundColor="#2D59D9" />
        </View>
      </PageBase>
    );
  }
}

export default connect(state => ({...state.postJob}))(PostJob);
