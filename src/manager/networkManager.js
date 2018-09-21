import userManager from './userManager';
import Config from '../pages/PostJob/config';
import {Alert} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

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

  /**
   *
   * @param {string} type
   */
  async uploadPicture(type) {
    try {
      // 获取照片
      let image = {};
      if (type === 'picture') {
        image = await ImagePicker.openPicker({
          width: 400,
          height: 400,
          cropping: true,
          cropperCircleOverlay: true,
        });
      } else {
        await ImagePicker.openCamera({
          width: 400,
          height: 400,
          cropping: true,
          cropperCircleOverlay: true,
        });
      }
      // formData
      let formData = new FormData();
      let file = {
        uri: image.path,
        type: image.mime,
        name: 'fileToUpload',
      };
      formData.append('fileToUpload', file);
      const res = await fetch(
        `${this.url}upload.php?token=${userManager.getToken()}&c=u`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        }
      );
      const json = await res.json();

      return {
        ret: json.ret,
        url: json.url,
      };
    } catch (e) {
      if (/User/.test(e.message))
        return {
          ret: 'cancel',
          message: e.message,
        };
      else {
        return {
          ret: 'fail',
          message: e.message,
        };
      }
    }
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

      if (res.status !== 200) {
        Alert.alert('debug: 服务器返回错误', `${res.status}`);
        return {};
      }

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

  async getPostJobList() {
    const body = {
      a: 'gpl',
      token: userManager.getToken(),
    };

    const res = await fetch('http://18.222.175.208/', {
      method: 'POST',
      body: JSON.stringify({param: body}),
      headers: {
        'Content-Type': 'application/x-www-form-urlencode',
      },
    });

    return await res.json();
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
    console.log(type);
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

  async addExprience(experiences) {
    const userId = userManager.getToken();
    const body = {
      a: 'up',
      token: userId,
      experiences: experiences,
    };

    return await this.fetcher(body);
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
    if (!res) {
      Alert.alert('debug: getProfile,服务器返回错误', `res:${res}`);
      return {};
    }
    const json = res.data;

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

  async deleteExprience(id) {
    const res = await this.fetcher({
      a: 'de',
      token: userManager.getToken(),
      id,
    });
    console.log(res);
  }

  async deleteQualification(id) {
    const res = await this.fetcher({
      a: 'dq',
      token: userManager.getToken(),
      id,
    });
  }
}
