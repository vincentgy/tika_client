const JsonFile = require('../area.json');
const fs = require('fs');

console.log('正在提取位置信息......');

const r = Object.keys(JsonFile.regions).map(id => {
  const region = JsonFile.regions[id];
  return {
    id,
    region,
  };
});

const d = {};
Object.keys(JsonFile.regions).forEach(id => {
  const disctrict = JsonFile[id];

  const dd = Object.keys(disctrict).map(dId => {
    return {
      id: dId,
      name: disctrict[dId],
    };
  });

  d[id] = dd;
});

console.log(d);

const JSfile = `export const Regions = ${JSON.stringify(
  r,
  null,
  2
)}\n export const Disctrict = ${JSON.stringify(d, null, 2)}`;

fs.writeFileSync('./src/pages/PostJob/area.js', JSfile, 'utf8');

console.log('提取完毕');
