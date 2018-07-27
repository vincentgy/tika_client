export default {
  name: 'postJob',
  state: {
    title: 'title',
    company: 'company',
    type: '',
    payType: '',
    payRange: '',
    region: '',
    district: '',
    location: '',
    number: '',
    categories: '',
    currentField: '',
  },
  reducers: {
    mapSome: (state, {payload}) => {
      return {...state, [state.currentField]: payload};
    },
    changeField: (state, {payload}) => {
      return {...state, currentField: payload};
    },
  },
  effects: {
    *ChangeCurrentField({put}, {payload}) {
      yield put({
        type: 'changeField',
        payload,
      });
    },
    *EditPostJob({put}, {payload}) {
      yield put({
        type: 'mapSome',
        payload,
      });
    },
  },
};
