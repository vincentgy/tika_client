// const payType = [
//   {id: '1', name: 'one-off'},
//   {id: '2', name: 'annual'},
//   {id: '3', name: 'hourly'},
// ];

export default {
  name: 'postJob',
  state: {
    title: 'edit',
    company: 'edit',
    type: 'choose',
    payType: 'choose',
    payRange: 'choose',
    region: 'choose',
    district: '',
    location: 'edit',
    number: 'edit',
    categories: 'choose',
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
