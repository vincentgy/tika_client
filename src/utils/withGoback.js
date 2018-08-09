/**
 * 提供一个 goBack props
 */
import React from 'react';

export const WithGoback = Cpn => {
  return class wrapper extends React.Component {
    goback = () => {
      this.props.navigation && this.props.navigation.goBack();
    };

    render() {
      const gobackProps = {
        goback: this.goback,
      };

      return <Cpn {...this.props} {...gobackProps} />;
    }
  };
};
