// const payType = [
//   {id: '1', name: 'one-off'},
//   {id: '2', name: 'annual'},
//   {id: '3', name: 'hourly'},
// ];
import {Regions, Disctrict} from '../pages/PostJob/area';

export default {
  name: 'postJob',
  state: {
    title: 'edit',
    company: 'edit',
    type: 'choose',
    payType: 'one-off',
    payRange: 'choose',
    region: 'choose',
    district: '',
    location: 'edit',
    number: 'edit',
    categories: 'choose',
    categories_id: null,
    currentField: '',
    region_id: '',
    district_id: '',
  },
  reducers: {
    mapSome: (state, {payload}) => {
      return {...state, [state.currentField]: payload};
    },
    EditCategoris: (state, {payload}) => {
      const {name, id} = payload;
      return {...state, categories: name, categories_id: id};
    },
    changeField: (state, {payload}) => {
      return {...state, currentField: payload};
    },
    EditPlace: (state, {payload}) => {
      const {region, district} = payload;
      const region_id = Regions.find(i => i.region === region).id;
      const district_id = Disctrict[region_id].find(i => i.name === district)
        .id;

      return {...state, region, district, region_id, district_id};
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
