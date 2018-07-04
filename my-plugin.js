console.log('运行到这个')

module.exports = {
  visitor: {
    // 这里的ref是ImportDeclaration的第二个参数，这里的值是.babelrc中的 {
    // "library": "lodash"
    //}, 这里是指定 我们在引用哪个库的时候使用这个插件
    CallExpression({ node }) {
      if (node.callee.property && node.callee.property.name === 'addController') console.log(node.callee.property.name)
    }
  }
}
