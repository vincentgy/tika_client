import React from 'react';

export const Page = option => {
  return Cpn => {
    return class wrapper extends React.Component {
      static navigationOptions = option;
      render() {
        return <Cpn {...this.props} />;
      }
    };
  };
};
