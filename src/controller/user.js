import {AsyncStorage} from 'react-native';
import UserManager from '../manager/userManager';

export const LoginType = {
  INIT: 'INIT',
  SEEKER: 'SEEKER',
  EMPLOYER: 'EMPLOYER',
  NOT: 'NOT',
};

export default {
  name: 'user',
  state: {
    isLogin: LoginType.INIT,
  },
  reducers: {
    mutateUser: (state, {payload}) => {
      return {...state, [payload.key]: payload.value};
    },
  },
  effects: {
    *goToRecruter({put}) {
      yield AsyncStorage.setItem('role', LoginType.EMPLOYER);
      yield put({
        type: 'mutateUser',
        payload: {
          key: 'isLogin',
          value: LoginType.EMPLOYER,
        },
      });
    },
    *gotoSeeker({put}) {
      yield AsyncStorage.setItem('role', LoginType.SEEKER);
      yield put({
        type: 'mutateUser',
        payload: {
          key: 'isLogin',
          value: LoginType.SEEKER,
        },
      });
    },
    *checkLogin({put}) {
      const token = yield AsyncStorage.getItem('token');
      const role = yield AsyncStorage.getItem('role');

      if (token !== null) {
        UserManager.setToken(token);
        yield put({
          type: 'mutateUser',
          payload: {
            key: 'isLogin',
            value: role === null ? LoginType.SEEKER : role,
          },
        });
      } else {
        // 确保用户登出的时候，能回到登录页面
        yield put({
          type: 'mutateUser',
          payload: {
            key: 'isLogin',
            value: LoginType.NOT,
          },
        });
      }
    },
  },
};
