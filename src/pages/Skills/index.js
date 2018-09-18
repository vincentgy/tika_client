import React from 'react';
import TagInput from '../../components/TagInput';
import PageBase from '../../components/PageBase';
import Header from '../../components/Header';
import List from '../../components/List';
import {Text} from 'react-native';
import {Entypo, MaterialIcons} from '../../components/Icons';
import {EasyTap} from '../../public/EasyTap';

const Skills = props => {
  return (
    <React.Fragment>
      <Header
        leftButton={[
          <EasyTap key={1} onPress={() => props.navigation.goBack()}>
            <Entypo size={16} color="white" key={0} name="chevron-thin-left" />
          </EasyTap>,
        ]}
        rightButton={[
          <EasyTap key={1} onPress={() => props.navigation.goBack()}>
            <MaterialIcons size={20} color="white" key={0} name="check" />
          </EasyTap>,
        ]}
      />
      <PageBase>
        <List
          title={
            <Text style={{marginTop: 16, marginLeft: 8, color: '#abb0b0'}}>
              Skills
            </Text>
          }>
          <TagInput />
        </List>
      </PageBase>
    </React.Fragment>
  );
};

export default Skills;
