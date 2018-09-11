import {Regions, Disctrict} from '../pages/PostJob/area';
import {DataProvider} from 'recyclerlistview';

const getPosition = () =>
  // eslint-disable-next-line
  new Promise((resovle, reject) => {
    navigator.geolocation.getCurrentPosition(
      res => {
        console.log(res);
        resovle({
          latitude: res.coords.latitude,
          longitude: res.coords.longitude,
        });
      },
      () => {
        reject('fail');
      },
      {enableHighAccuracy: true, timeout: 1000, maximumAge: 100}
    );
  });

const DISTANCE_TYPE = {
  '1 km': 1000,
  '3 km': 3000,
  '5 km': 5000,
  '10 km': 10000,
};

export default {
  name: 'filter',
  state: {
    distance: 'Whole City',
    jobType: {jobType: 0, payRange: {}},
    location: {region: '', disctrict: {}},
    categories: {},
    list: new DataProvider((r1, r2) => {
      return r1 !== r2;
    }),
    loading: false,
    searchText: '',
    resultList: new DataProvider((r1, r2) => {
      return r1 !== r2;
    }),
  },
  reducers: {
    editFilter: (state, {payload}) => {
      const {data, name} = payload;
      return {...state, [name]: data};
    },
    loading: (state, {payload}) => {
      return {...state, loading: payload};
    },
  },
  effects: {
    *SearchJob({put, select, call}, {payload}) {},
    *queryFilter({put, select, call}, {payload}) {},
  },
};
