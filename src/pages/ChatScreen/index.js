import {GiftedChat, Send} from 'react-native-gifted-chat';
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Header from '../../components/Header';

export default class Example extends React.Component {
  state = {
    messages: [],
  };

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    });
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  renderSend = props => {
    return (
      <Send {...props}>
        <View style={{marginRight: 10, marginBottom: 5}}>
          <Text>send</Text>
        </View>
      </Send>
    );
  };

  render() {
    return (
      <React.Fragment>
        <Header />
        <GiftedChat
          renderSend={this.renderSend}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
      </React.Fragment>
    );
  }
}
