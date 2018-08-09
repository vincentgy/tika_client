import {Regions, Disctrict} from '../pages/PostJob/area';
import {DataProvider} from 'recyclerlistview';
import {Alert} from 'react-native';
import {Debugger} from '../utils/logger';

const getPosition = () =>
  // eslint-disable-next-line
  new Promise((resovle, reject) => {
    navigator.geolocation.getCurrentPosition(
      res => {
        resovle({
          latitude: res.coords.latitude,
          longitude: res.coords.longitude,
        });
      },
      () => {
        reject('fail');
      }
    );
  });

export default {
  name: 'filter',
  state: {
    distance: 'Whole City',
    jobType: {jobType: 0, payRange: {}},
    location: {region: 'Auckland', disctrict: {}},
    categories: {},
    list: new DataProvider((r1, r2) => {
      return r1 !== r2;
    }),
    loading: false,
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
    *queryFilter({put, select, call}, {payload}) {
      const {data, name} = payload;

      yield put({
        type: 'loading',
        payload: true,
      });

      // 完全不懂这个 Whole City 哪里来的
      if (data !== 'Whole City' && name) {
        yield put({
          type: 'editFilter',
          payload: {data, name},
        });
      }

      try {
        const filter = yield select(state => state.filter);

        const region = filter.location.region;
        const regionId = Regions.find(i => i.region === region).id;

        const disctrictList = Object.keys(filter.location.disctrict).map(
          name => {
            return Disctrict[regionId]
              .filter(i => {
                if (i.name === name) return i;
              })
              .map(i => i.id);
          }
        );

        const categories = Object.keys(filter.categories).map(key => {
          return filter.categories[key].id;
        });

        const position = yield getPosition();

        Debugger.log(disctrictList);
        const url = 'http://18.222.175.208';
        const body = {
          a: 'sj',
          query: {
            title: '',
            company: '',
            description: '',
            type: filter.jobType.jobType,
            region_id: regionId,
            district_ids: disctrictList[0],
            category_ids: categories,
            location: '',
            minimum_pay: 0,
            maximum_pay: 0,
          },
          location: {
            latitude: position.latitude,
            longitude: position.longitude,
          },
        };

        const res = yield call(fetch, url, {
          method: 'POST',
          body: JSON.stringify({param: body}),
          headers: {
            'Content-Type': 'application/x-www-form-urlencode',
          },
        });

        const json = yield res.json();

        Debugger.log(json.data);
        yield put({
          type: 'editFilter',
          payload: {
            name: 'list',
            data: filter.list.cloneWithRows(json.data),
          },
        });

        yield put({
          type: 'loading',
          payload: false,
        });
      } catch (e) {
        Alert.alert('error', JSON.stringify(e));
      }
    },
  },
};
