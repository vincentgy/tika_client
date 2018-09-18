import userManager from './userManager';
import Config from '../pages/PostJob/config';
import {Alert} from 'react-native';

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
      e => {
        reject(e);
      },
      {enableHighAccuracy: true, timeout: 3000}
    );
  });

export class NetworkManager {
  constructor() {
    this.url = 'http://18.222.175.208/';
  }

  async fetcher(body) {
    try {
      const res = await fetch(this.url, {
        method: 'POST',
        body: JSON.stringify({param: body}),
        headers: {
          'Content-Type': 'application/x-www-form-urlencode',
        },
      });

      const json = await res.json();

      return json;
    } catch (e) {
      Alert.alert('debug: error', JSON.stringify(e));
    }
  }

  async textSearch(text) {
    // ‘title’ : job title key word,
    // ‘company’ : company name key word,
    // ‘description’ : job description key word,
    const position = await getPosition();

    const body = {
      a: 'sj',
      query: {
        title: text,
        company: text,
        description: text,
      },
      location: {
        latitude: position.latitude,
        longitude: position.longitude,
      },
    };

    return await this.fetcher(body);
  }

  async postJob(
    title,
    company,
    description,
    type,
    pay_type,
    minimum_pay,
    maximum_pay,
    region_id,
    district_id,
    location,
    number,
    categories
  ) {
    //     ```bash
    // Request,
    // ‘a’:'pj',
    // ‘title’ : job title,
    // ‘company’ : company name,
    // ‘description’ : job description,
    // ’user_id’ : user id of creator,
    // ‘type’ : job type id,
    // ‘pay_type’ : pay type id,
    // ‘minimum_pay’ : minimum salary,
    // ‘maximum_pay’ : maximum salary,
    // ‘region_id’ : region id,
    // ‘district_id’ : district id,
    // ‘location’ : detailed address,
    // ‘number’ : number of employees required,
    // ‘categories’ : list of categories the job belongs.

    const jobType_id = Config.jobType.find(i => i.name === type).id;

    const body = {
      a: 'pj',
      token: userManager.getToken(),
      title,
      company,
      description,
      type: jobType_id, //临时
      pay_type: '2', //临时
      minimum_pay,
      maximum_pay,
      region_id,
      district_id,
      location,
      number,
      categories,
    };

    return await this.fetcher(body);
  }

  /**
   * 根据 filter 搜索用户所要的工作信息
   * @param {*} regionId
   * @param {*} districtIds
   * @param {*} categoriesIds
   * @param {*} jobTypeId
   */
  async searchByFilter(
    regionId,
    districtIds,
    categoriesIds,
    jobTypeId,
    moneyRange
  ) {
    try {
      const distIds = Object.keys(districtIds);
      const cateIds = Object.keys(categoriesIds).filter(key => {
        if (categoriesIds[key] !== 0) return key;
      });
      const money = {
        0: 0,
        1: 50000,
        2: 75000,
        3: 100000,
        4: 125000,
        5: 150000,
        6: 200000,
      };

      const query = {
        region_id: regionId,
        district_ids: distIds,
        category_ids: cateIds,
        type: jobTypeId,
        minimum_pay: money[moneyRange.min],
        maximum_pay: money[moneyRange.max],
      };

      Object.keys(query).forEach(key => {
        if (query[key].length === 0 || query[key] < 0 || query[key] === '0') {
          delete query[key];
        }
      });

      const position = await getPosition();

      const body = {
        a: 'sj',
        query: query,
        location: {
          latitude: position.latitude,
          longitude: position.longitude,
        },
      };

      return await this.fetcher(body);
    } catch (e) {
      console.log(e);
      return [];
    }
  }

  async UpdateProfile(aboutme, skills, qualifications, experiences) {
    const userId = userManager.getToken();
    const body = {
      a: 'up',
      token: userId,
      description: aboutme,
      phone: '',
      skills: skills,
      qualifications: qualifications,
      experiences: experiences,
    };

    console.log(body);

    return await this.fetcher(body);
  }

  /**
   * 从服务器获取category
   */
  async getCategory() {
    return await this.fetcher({a: 'jc'});
  }

  async getProfile() {
    const res = await this.fetcher({a: 'gp', token: userManager.getToken()});

    const json = res.data;
    console.log(json);

    return {
      avatar: json.avatar,
      description: json.description,
      email: json.email,
      experiences: json.experiences,
      name: json.name,
      phone: json.phone,
      qualifications: json.qualifications,
      skills: json.skills,
    };
  }
}
