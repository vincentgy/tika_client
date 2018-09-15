import React from 'react';
import MapView from './native.ios';
import {Platform} from 'react-native';
import MapViewAndroid from 'react-native-maps';

// const styles = StyleSheet.create({
//   container: {
//     ...StyleSheet.absoluteFillObject,
//     height: 400,
//     width: 400,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
// });
export default props => {
  const {region, ...others} = props;

  return Platform.OS === 'ios' ? (
    <MapView {...props} />
  ) : (
    <MapViewAndroid {...others} initialRegion={region} />
  );
};
