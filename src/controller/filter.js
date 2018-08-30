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
      {enableHighAccuracy: true, timeout: 10000, maximumAge: 3000}
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
    *SearchJob({put, select, call}, {payload}) {
      yield put({
        type: 'loading',
        payload: true,
      });
      yield put({
        type: 'editFilter',
        payload: {data: payload, name: 'searchText'},
      });

      const filter = yield select(state => state.filter);

      const position = yield getPosition();
      // Debugger.log(disctrictList);
      const url = 'http://18.222.175.208';

      const body = {
        a: 'sj',
        query: {
          title: filter.searchText,
          company: filter.searchText,
          description: filter.searchText,
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

      yield put({
        type: 'editFilter',
        payload: {
          name: 'resultList',
          data: filter.list.cloneWithRows(json.data),
        },
      });

      yield put({
        type: 'loading',
        payload: false,
      });
    },
    *queryFilter({put, select, call}, {payload}) {
      const {data, name} = payload;

      yield put({
        type: 'loading',
        payload: true,
      });

      // 完全不懂这个 Whole City 哪里来的
      if (name) {
        yield put({
          type: 'editFilter',
          payload: {data, name},
        });
      }

      try {
        const filter = yield select(state => state.filter);

        const distance = DISTANCE_TYPE[filter.distance];

        const region = filter.location.region;

        const regionId =
          Regions.find(i => i.region === region) &&
          Regions.find(i => i.region === region).id;

        const dList = [];
        const disctrictList = Object.keys(filter.location.disctrict).forEach(
          name => {
            Disctrict[regionId].forEach(i => {
              if (i.name === name && filter.location.disctrict[name] === 1)
                dList.push(i.id);
            });
          }
        );

        const categories = Object.keys(filter.categories)
          .map(key => {
            return filter.categories[key] && filter.categories[key].id;
          })
          .filter(i => {
            // 取消选择的时候要过滤掉undefined
            if (i) return i;
          });

        const position = yield getPosition();
        // Debugger.log(disctrictList);
        const url = 'http://18.222.175.208';

        const makeBody = (bool, key, value) => {
          if (bool) {
            body.query[key] = value;
          }
        };

        const body = {
          a: 'sj',
          query: {
            // minimum_pay: 0,
            // maximum_pay: 0,
          },
          location: {
            latitude: position.latitude,
            longitude: position.longitude,
          },
        };
        makeBody(regionId, 'region_id', regionId);
        makeBody(dList.length > 0, 'district_ids', dList);

        makeBody(distance && distance !== 'Whole City', 'distance', distance);
        makeBody(categories.length > 0, 'category_ids', categories);
        makeBody(
          Object.keys(filter.jobType.payRange).length > 0,
          'type',
          filter.jobType.jobType
        );

        const res = yield call(fetch, url, {
          method: 'POST',
          body: JSON.stringify({param: body}),
          headers: {
            'Content-Type': 'application/x-www-form-urlencode',
          },
        });

        const json = yield res.json();

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
        // Alert.alert('error', JSON.stringify(e));
        console.log(e);
      }
    },
  },
};
