import userManager from './userManager';

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
    const res = await fetch('http://18.222.175.208/', {
      method: 'POST',
      body: JSON.stringify({param: body}),
      headers: {
        'Content-Type': 'application/x-www-form-urlencode',
      },
    });
    const json = await res.json();

    return json;
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

      const res = await fetch('http://18.222.175.208/', {
        method: 'POST',
        body: JSON.stringify({param: body}),
        headers: {
          'Content-Type': 'application/x-www-form-urlencode',
        },
      });

      const json = await res.json();

      return json;
    } catch (e) {
      console.log(e);
      return {};
    }
  }

  /**
   * 从服务器获取category
   */
  async getCategory() {
    const res = await fetch('http://18.222.175.208/', {
      method: 'POST',
      body: JSON.stringify({param: {a: 'jc'}}),
      headers: {
        'Content-Type': 'application/x-www-form-urlencode',
      },
    });

    const json = await res.json();

    return json;
  }

  async getProfile() {
    const res = await fetch('http://18.222.175.208/', {
      method: 'POST',
      body: JSON.stringify({param: {a: 'gp', token: userManager.getToken()}}),
      headers: {
        'Content-Type': 'application/x-www-form-urlencode',
      },
    });

    return await res.json();
  }
}
