const request = require('request');
const fs = require('fs');

request(
  {
    url: 'http://www.foveluy.com/upload_apk/metal_gear2',
    method: 'POST',
    formData: {
      'timix.apk': fs.createReadStream(
        './android/app/build/outputs/apk/release/app-release.apk'
      ),
    },
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  },
  function(error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('上传完成:', body);
    } else {
      console.log('上传出错:', error, body);
    }
  }
);
