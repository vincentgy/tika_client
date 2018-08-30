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

  async searchByFilter(regionId, districtIds, categoriesIds, jobTypeId) {
    console.log({regionId, districtIds, categoriesIds, jobTypeId});
    const distIds = Object.keys(districtIds);
    const cateIds = Object.keys(categoriesIds).filter(key => {
      if (categoriesIds[key] !== 0) return key;
    });

    const query = {
      region_id: regionId,
      district_ids: distIds,
      category_ids: cateIds,
      type: jobTypeId,
      // minimum_pay: 0,
      // maximum_pay: 0,
    };

    Object.keys(query).forEach(key => {
      if (query[key].length === 0 || query[key] < 0 || query[key] === '0') {
        delete query[key];
      }
    });

    console.log(query);
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
  }

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
}
