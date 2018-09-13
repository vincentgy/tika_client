import React from 'react';
import {TouchableOpacity, View, Text, Image, Platform} from 'react-native';
import styled from 'styled-components';
import timeago from 'timeago.js';

const TouchBase = styled.TouchableOpacity`
  background-color: white;
  margin-left: 8px;
  margin-right: 8px;
  border-radius: 4px;
  margin-top: 8px;
  height: 88px;
`;

const Tag = ({text, color, backgroundColor}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: backgroundColor,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        marginLeft: 8,
      }}>
      <Text
        style={{
          fontSize: 12,
          fontWeight: '100',
          color: color,
        }}>
        {text}
      </Text>
    </View>
  );
};

const JobListItem = ({
  onPress,
  timestamp,
  title,
  location,
  minimum_pay,
  maximum_pay,
}) => {
  const nows = timeago().format(timestamp);
  return (
    <TouchBase onPress={onPress} activeOpacity={0.7}>
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 4,
        }}>
        <View style={{flexDirection: 'row', padding: 8}}>
          <Image
            style={{width: 40, height: 40}}
            source={require('./alibaba.png')}
          />
          <View
            style={{
              marginLeft: 16,
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text
                style={{color: 'black', fontSize: 16, marginBottom: 8}}
                ellipsizeMode="tail"
                numberOfLines={1}>
                {title}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{color: '#8A8A8F', fontSize: 12, fontWeight: '300'}}>
                  {location}
                </Text>
                <Text
                  style={{
                    color: '#8A8A8F',
                    fontSize: 12,
                    fontWeight: '300',
                  }}>{`    ${nows}`}</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  marginTop: 8,
                }}>
                <Tag
                  text={`${minimum_pay / 1000}k-${maximum_pay / 1000}k`}
                  color="#1DAA92"
                  backgroundColor="rgba(29,170,146,0.1)"
                />
                <Tag
                  text="full time"
                  color="#333"
                  backgroundColor="rgba(33,33,33,0.05)"
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchBase>
  );
};

JobListItem.HEIGHT = Platform.OS === 'ios' ? 96 : 144;

export default JobListItem;
