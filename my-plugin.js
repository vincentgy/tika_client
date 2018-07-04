

module.exports = {
  visitor: {
    // 这里的ref是ImportDeclaration的第二个参数，这里的值是.babelrc中的 {
    // "library": "lodash"
    //}, 这里是指定 我们在引用哪个库的时候使用这个插件
    ImportDeclaration(path, ref = {}) {
        console.log('读取到了~~~')
    }
  }
}
