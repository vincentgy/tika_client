import React from 'react';
import ActionSheet from 'react-native-actionsheet'; //https://github.com/beefe/react-native-actionsheet
import {TouchableOpacity, Image} from 'react-native';
import {Put} from '../../store';
import {NetworkManager} from '../../manager/networkManager';

export default class UserImage extends React.Component {
  async Picture(type) {
    this.manager = new NetworkManager();
    const json = await this.manager.uploadPicture(type);

    if (json.ret === 0) {
      Put(state => {
        state.profile.avatar = json.url;
      });
      this.props.dropdown.alertWithType(
        'success',
        'success',
        'great! you have changed a new avatar'
      );
    } else {
      if (json.ret === 'cancel') {
        this.props.dropdown.alertWithType('info', 'Info', json.message);
      } else {
        this.props.dropdown.alertWithType('error', 'Error', json.message);
      }
    }
  }

  showActionSheet = () => {
    this.ActionSheet.show();
  };

  render() {
    return (
      <React.Fragment>
        <TouchableOpacity onPress={this.showActionSheet}>
          <Image
            source={{uri: this.props.uri}}
            style={{
              width: 64,
              height: 64,
              marginRight: 16,
              borderRadius: 32,
            }}
          />
        </TouchableOpacity>
        <ActionSheet
          ref={o => (this.ActionSheet = o)}
          title={'Choose a picture or take a photo'}
          options={['Picture', 'Take a photo', 'cancel']}
          cancelButtonIndex={2}
          onPress={index => {
            if (index === 0) {
              this.Picture('picture');
            } else if (index === 1) {
              this.Picture();
            }
          }}
        />
      </React.Fragment>
    );
  }
}
