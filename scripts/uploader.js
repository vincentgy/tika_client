const request = require('request');
const fs = require('fs');

request(
  {
    url: 'http://127.0.0.1:7001/upload_apk/metal2_gear2',
    method: 'POST',
    formData: {
      'timix.apk': fs.createReadStream('./timix.apk'),
    },
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  },
  function(error, response, body) {
    if (!error && response.statusCode == 200) {
    } else {
      console.log('上传出错:', response.statusCode, body);
    }
  }
);
