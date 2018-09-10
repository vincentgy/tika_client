import React from 'react';
import TagInput from '../../components/TagInput';
import PageBase from '../../components/PageBase';
import Header from '../../components/Header';
import List from '../../components/List';
import {Text} from 'react-native';

const Skills = () => {
  return (
    <React.Fragment>
      <Header />
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
