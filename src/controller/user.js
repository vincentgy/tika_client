import {AsyncStorage} from 'react-native';
import UserManager from '../manager/userManager';

export default {
  name: 'user',
  state: {
    isLogin: 'init-login-props',
  },
  reducers: {
    mutateUser: (state, {payload}) => {
      return {...state, [payload.key]: payload.value};
    },
  },
  effects: {
    *checkLogin({put}) {
      const token = yield AsyncStorage.getItem('token');

      if (token !== null) {
        UserManager.setToken(token);
        yield put({
          type: 'mutateUser',
          payload: {
            key: 'isLogin',
            value: true,
          },
        });
      } else {
        // 确保用户登出的时候，能回到登录页面
        yield put({
          type: 'mutateUser',
          payload: {
            key: 'isLogin',
            value: false,
          },
        });
      }
    },
  },
};
