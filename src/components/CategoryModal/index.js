import React from 'react';
import {View, ScrollView, TouchableWithoutFeedback} from 'react-native';
import List from '../List';
import Modal from '../react-native-modal';
import {NetworkManager} from '../../manager/networkManager';
import SelectItem from '../../public/SelectItem';

class PatchedScrollView extends React.PureComponent {
  componentDidMount() {
    // Dirty hack
    this._scrollView.scrollResponderHandleStartShouldSetResponder = () => true;
  }

  render() {
    return (
      <ScrollView ref={x => (this._scrollView = x)} {...this.props}>
        {this.props.children}
      </ScrollView>
    );
  }
}

export default class CategoryModal extends React.Component {
  state = {
    isVisiable: false,
    cateData: [],
  };

  async fetchCate() {
    if (this.state.cateData.length > 0) return;
    const net = new NetworkManager();
    const i = await net.getCategory();
    this.setState({
      cateData: i.data,
    });
  }

  componentDidMount() {
    this.fetchCate();
  }

  render() {
    return (
      <View style={{backgroundColor: 'white'}}>
        <List.Item
          title="Category"
          onPress={() => this.setState({isVisiable: true})}
        />
        <Modal
          isVisible={this.state.isVisiable}
          hasHandle
          style={{margin: 0, justifyContent: 'flex-end'}}
          renderHandle={() => (
            <View
              style={{
                height: 24,
                backgroundColor: 'white',
                borderTopLeftRadius: 32,
                borderTopRightRadius: 32,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  backgroundColor: '#abb0b0',
                  height: 3,
                  width: 48,
                  borderRadius: 4,
                }}
              />
            </View>
          )}
          onSwipe={() => this.setState({isVisiable: false})}
          swipeDirection="down">
          <PatchedScrollView style={{backgroundColor: 'white', height: 400}}>
            {this.state.cateData.map(item => (
              <SelectItem key={item.id}>{item.name}</SelectItem>
            ))}
          </PatchedScrollView>
        </Modal>
      </View>
    );
  }
}
