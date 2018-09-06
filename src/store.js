import {init} from 'rectx';
import {DataProvider} from 'recyclerlistview';

const Store = init({
  /**
   * all:0
   * fulltime:1
   * contract:2
   * part-time:3
   * one-off:4
   */
  jobTypeId: '0',
  jobType: {
    0: 'all',
    1: 'fulltime',
    2: 'contract',
    3: 'part-time',
    4: 'one-off',
  },
  moneyRange: {
    min: 0,
    max: 2,
  },
  regionId: -1,
  districtIds: {},
  categories: [],
  categoriesIds: {},
  profile: {
    aboutMe: '',
    qualification: [],
    major: '',
    employedFrom: '',
    employedTo: '',
    skills: [],
  },
  job: {
    list: new DataProvider((r1, r2) => {
      return r1 !== r2;
    }),
    loading: true,
  },
});

export const Put = Store.Put;
export const Ctx = Store.Ctx;
export const Auto = Store.Auto;
export const getStore = Store.Store;
