console.log('asdasdasdasas')

module.exports = {
  getTransformModulePath() {
    return require.resolve('./my-plugin')
  },
  getSourceExts() {
    return ['js', 'jsx', 'styl']
  }
}
