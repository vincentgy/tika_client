var transformer = require('metro/src/transformer');
const fs = require('fs');

function transform(src) {
  let srcs = src;
  if (/App.js/.test(src.filename)) {
    console.log('读取');
    const added = fs
      .readdirSync('./src/controller')
      .filter(file => file !== 'user.js')
      .map(
        file =>
          `import ${file.replace(
            '.js',
            ''
          )} from "./src/controller/${file}"; \nRluy.addController(${file.replace(
            '.js',
            ''
          )});`
      )
      .join('\n');

    console.log(added);
    srcs.src += added;
  }
  //[ 'filename', 'localPath', 'options', 'plugins', 'src' ]
  //   const i = Object.keys(src)

  return transformer.transform(srcs);
}

module.exports.transform = transform;
