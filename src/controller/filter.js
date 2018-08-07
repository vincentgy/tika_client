import {Regions, Disctrict} from '../pages/PostJob/area';
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
  },
  reducers: {
    editFilter: (state, {payload}) => {
      const {data, name} = payload;
      return {...state, [name]: data};
    },
  },
  effects: {
    *queryFilter({put, select, call}, {payload}) {
      const {data, name} = payload;

      yield put({
        type: 'editFilter',
        payload: {data, name},
      });

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

        const position = yield getPosition;

        const url = 'http://18.222.175.208';
        const body = {
          a: 'sj',
          query: {
            title: '',
            company: '',
            description: '',
            type: filter.jobType.jobType,
            region_id: regionId,
            district_ids: disctrictList,
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

        // Debugger.log(body);

        // Alert.alert(JSON.stringify(body));

        //   'query' =>[
        //     ‘title’ : job title key word,
        //     ‘company’ : company name key word,
        //     ‘description’ : job description key word,
        //     ‘type’ : job type id,
        //     ‘pay_type’ : pay type id,
        //     ‘minimum_pay’ : minimum salary,
        //     ‘maximum_pay’ : maximum salary,
        //     ‘region_id’ : region id,
        //     ‘district_ids’ : list of districts the jobs are in.
        //     ‘location’ : address key word,
        //     ‘category_ids’ : list of categories the job belongs.
        // ],
        // 'location' =>[
        //     ‘latitude’: latitude of current location,
        //     ‘longitude’: ‘longitude’ of current location
        // ]

        const res = yield call(fetch, url, {
          method: 'POST',
          body: JSON.stringify({param: body}),
          headers: {
            'Content-Type': 'application/x-www-form-urlencode',
          },
        });

        const json = yield res.json();

        Debugger.log(json);
      } catch (e) {
        Debugger.log(e);
      }
    },
  },
};
