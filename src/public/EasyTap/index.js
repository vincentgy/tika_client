import styled from 'styled-components';
import {Platform} from 'react-native';
/**
 * make icon easy to tap
 */
export const EasyTap = styled.TouchableOpacity`
  height: ${Platform.OS === 'ios' ? 40 : 32}px;
  width: 40px;
  justify-content: center;
  flex-direction: row;
  align-items: center;
`;
