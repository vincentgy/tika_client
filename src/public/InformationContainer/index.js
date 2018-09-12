import React from 'react';
import {View, Image, Text} from 'react-native';
import styled from 'styled-components';
import {WIDTH} from '../../utils/plaform';

const InfoBlock = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InformationContainer = styled.View`
  border-radius: 8px;
  background-color: #fafafa;
  flex-direction: row;
  justify-content: space-between;
  padding: 8px;
  margin-top: 16px;
`;

const Info = ({title, img, info, width = WIDTH / 3 - 32}) => {
  return (
    <InfoBlock style={{width: width}}>
      <Image
        source={img}
        style={{width: 30, height: 22, marginBottom: 8}}
        resizeMode="contain"
      />
      <Text style={{fontWeight: '100', fontSize: 12}}>{title}</Text>
      <Text style={{fontSize: 12}}>{info}</Text>
    </InfoBlock>
  );
};

const Container = ({children, style}) => {
  return <InformationContainer style={style}>{children}</InformationContainer>;
};

Container.Info = Info;

export default Container;
