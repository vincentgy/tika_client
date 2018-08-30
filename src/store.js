import {init} from 'rectx';
import {DataProvider} from 'recyclerlistview';

const Store = init({
  regionId: -1,
  districtIds: {},
  categories: [],
  categoriesIds: {},
  job: {
    list: new DataProvider((r1, r2) => {
      return r1 !== r2;
    }),
    loading: false,
  },
});

export const Put = Store.Put;
export const Ctx = Store.Ctx;
export const Auto = Store.Auto;
export const getStore = Store._store;
