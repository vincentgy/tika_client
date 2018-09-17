const JsonFile = require('../area.json');
const fs = require('fs');
const prettier = require('prettier');

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

const JSfile = `export const Regions = ${JSON.stringify(
  r,
  null,
  2
)}\n export const Disctrict = ${JSON.stringify(d, null, 2)}`;

const formated = prettier.format(JSfile, {
  semi: true,
  parser: 'babylon',
  printWidth: 80,
  tabWidth: 2,
  jsxBracketSameLine: true,
  singleQuote: true,
  bracketSpacing: false,
  trailingComma: 'es5',
});
fs.writeFileSync('./src/components/area.js', formated, 'utf8');

console.log('提取完毕');
