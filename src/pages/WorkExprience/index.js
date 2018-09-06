import React from 'react';

import PageBase from '../../components/PageBase';
import Input from '../../components/Input';
import List from '../../components/List';

export default class WorkExprience extends React.Component {
  render() {
    return (
      <PageBase>
        <List>
          <Input key={1} placeholder="Job title" />
          <Input key={2} placeholder="Company" />
          <List.Item key={3} title="Employment period" />
        </List>
        <List>
          <List.Item key={1} title="Category" />
          <List.Item key={2} title="Skills" />
        </List>
      </PageBase>
    );
  }
}
