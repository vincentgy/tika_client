import React from 'react';
import {View, Text, TouchableOpacity, Platform} from 'react-native';

//https://github.com/halilb/react-native-textinput-effects
import {Kohana} from 'react-native-textinput-effects';
import {EvilIcons, MaterialIcons, FontAwesome} from '../Icons';

const Tag = ({text, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: '#abb0b0',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 4,
        marginLeft: 8,
        marginVertical: 4,
        borderRadius: 8,
      }}>
      <Text style={{color: 'white', fontSize: 12}}>{text}</Text>
      <EvilIcons name="close" color="white" size={16} />
    </TouchableOpacity>
  );
};

export default class TagInput extends React.Component {
  state = {
    tags: [],
    currentText: '',
  };

  /**
   * 删除 tag
   */
  Delete = tag => {
    this.setState(
      {
        tags: this.state.tags.filter(i => {
          if (i !== tag) {
            return i;
          }
        }),
      },
      () => {
        this.props.onAddTag && this.props.onAddTag(this.state.tags);
      }
    );
  };

  addTags = () => {
    if (this.state.currentText !== '') {
      this.setState(
        {
          tags: this.state.tags.concat(this.state.currentText),
          currentText: '',
        },
        () => {
          this.props.onAddTag && this.props.onAddTag(this.state.tags);
        }
      );
    }
  };

  componentDidMount() {
    console.log(this.props.onAddTag ? true : false);
    if (this.props.onAddTag && this.props.tags !== this.state.tags) {
      this.setState({
        tags: this.props.tags,
      });
    }
  }

  componentDidUpdate() {
    if (this.props.onAddTag && this.props.tags !== this.state.tags) {
      this.setState({
        tags: this.props.tags,
      });
    }
  }

  render() {
    const {placeholder} = this.props;
    return (
      <View style={{backgroundColor: 'white'}}>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {this.state.tags.map((i, idx) => (
            <Tag key={idx} text={i} onPress={() => this.Delete(i)} />
          ))}
        </View>
        <Kohana
          inputStyle={{fontSize: 14}}
          style={{flexDirection: 'row', alignItems: 'center', height: 48}}
          iconClass={FontAwesome}
          labelStyle={{fontWeight: '100', fontSize: 14}}
          iconName={'tag'}
          iconSize={12}
          value={this.state.currentText}
          onChangeText={text => {
            this.setState({
              currentText: text,
            });
          }}
          onFocus={this.props.onFocus}
          onEndEditing={this.addTags}
          label={placeholder}
        />
      </View>
    );
  }
}
