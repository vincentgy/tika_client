module.exports = {
  getTransformModulePath() {
    return require.resolve('./my-plugin');
  },
  getSourceExts() {
    return ['.js', 'rluy'];
  },
};
