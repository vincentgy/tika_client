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
    payType: 'hourly',
    payRange: 'choose',
    region: 'choose',
    district: '',
    location: 'edit',
    number: 'edit',
    categories: 'choose',
    currentField: '',
    region_id: '',
    district_id: '',
  },
  reducers: {
    mapSome: (state, {payload}) => {
      return {...state, [state.currentField]: payload};
    },
    changeField: (state, {payload}) => {
      return {...state, currentField: payload};
    },
    EditRegion: (state, {payload}) => {
      const {id, region_id, name} = payload;
      return {...state, district_id: id, region_id: region_id, region: name};
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
