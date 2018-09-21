import React from 'react';
import TagInput from '../../components/TagInput';
import PageBase from '../../components/PageBase';
import Header from '../../components/Header';
import List from '../../components/List';
import {Text} from 'react-native';
import {Entypo, MaterialIcons} from '../../components/Icons';
import {EasyTap} from '../../public/EasyTap';
import {Auto, Put} from '../../store';

const SkillsStore = Auto(state => state.profile.skills);

class Skills extends React.Component {
  changeForm = tags => {
    Put(state => {
      state.profile.skills = tags;
    });
  };

  render() {
    return (
      <React.Fragment>
        <Header
          leftButton={[
            <EasyTap key={1} onPress={() => this.props.navigation.goBack()}>
              <Entypo
                size={16}
                color="white"
                key={0}
                name="chevron-thin-left"
              />
            </EasyTap>,
          ]}
          rightButton={[
            <EasyTap key={1} onPress={() => this.props.navigation.goBack()}>
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
            {SkillsStore(state => {
              return (
                <TagInput
                  onAddTag={this.changeForm}
                  tags={state ? state : []}
                />
              );
            })}
          </List>
        </PageBase>
      </React.Fragment>
    );
  }
}

export default Skills;
