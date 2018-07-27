import React from 'react';
import {View, ScrollView, Platform} from 'react-native';
import {Page} from '../../components/PageHOC';
import {WIDTH} from '../../utils/plaform';
import List from '../../components/List';
import {Button} from 'react-native-elements';
import {withNavigation} from 'react-navigation';
import {connect} from 'react-redux';

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
      <View>
        <ScrollView
          style={{
            height: '100%',
            width: WIDTH,
            marginTop: Platform.OS === 'ios' ? 20 : 0,
          }}>
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
            <Item key="3" title="Categories" desc={this.props.categories} />
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
        </ScrollView>
      </View>
    );
  }
}

export default connect(state => ({...state.postJob}))(PostJob);
