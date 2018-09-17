import {init} from 'rectx';
import {DataProvider} from 'recyclerlistview';

// ‘experiences’ => [
//   ‘place’ : company name or other location names,
//   ‘task’ : work content,
//   ‘start’ : start yearmonth, like 201008,
//   ‘end’ : start yearmonth, like 201208,
// ]

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
    name: '',
    avatar: '',
    aboutMe: '',
    qualification: [
      {
        degree: 'Bachelor',
        school: 'AUT',
        start: 'Jan 2017',
        end: 'Jan 2018',
        major: 'Information techonology',
      },
      {
        degree: 'Bachelor',
        school: 'AUT',
        start: 'Jan 2017',
        end: 'Jan 2018',
        major: 'Information techonology',
      },
    ],
    major: '',
    employedFrom: '',
    employedTo: '',
    skills: ['JavaScript', 'TypeScript', 'Nodejs', 'React Native'],
    experiences: [
      {place: 'timix', task: 'web', start: 'Jan 2017', end: 'Jan 2018'},
      {place: 'timix', task: 'web', start: 'Jan 2017', end: 'Jan 2018'},
    ],
  },
  job: {
    list: new DataProvider((r1, r2) => {
      return r1 !== r2;
    }),
    loading: true,
  },
  createJob: {
    //第一步
    categories: [],
    //第二步
    description: {
      JobTitle: 'web developer',
      Company: 'Timix',
      description: 'we are chinese',
      position: 1,
    },
    //第三步
    JobType: {
      type: '',
      min: '',
      max: '',
    },
    Location: {
      Region: {id: '', region: ''},
      District: {id: '', name: ''},
      Address: '325 east coast road',
    },
  },
});

export const Put = Store.Put;
export const Ctx = Store.Ctx;
export const Auto = Store.Auto;
export const getStore = Store.Store;
