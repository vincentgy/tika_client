// MapView.js
import PropTypes from 'prop-types';
import React from 'react';
import {requireNativeComponent} from 'react-native';

class MapView extends React.Component {
  render() {

    return <RNTMap {...this.props} />;
  }
}

MapView.propTypes = {

  /**
   * 经度
   */
  x:PropTypes.any.isRequired,
  /**
   * 维度
   */
  y:PropTypes.any.isRequired,
  /**
   * A Boolean value that determines whether the user may use pinch
   * gestures to zoom in and out of the map.
   */
  scrollEnabled: PropTypes.bool,
  region: PropTypes.shape({
    /**
     * Coordinates for the center of the map.
     */
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,

    /**
     * Distance between the minimum and the maximum latitude/longitude
     * to be displayed.
     */
    latitudeDelta: PropTypes.number.isRequired,
    longitudeDelta: PropTypes.number.isRequired,
  }),
};

var RNTMap = requireNativeComponent('RNTMap', MapView);

module.exports = MapView;
