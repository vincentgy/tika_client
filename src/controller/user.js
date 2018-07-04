export default {
  name: 'user',
  state: {},
  reducers: {
    mapSome: (state, { payload }) => {
      return state
    }
  },
  effects: {
    *fetchUser({ put }, { payload }) {}
  }
}
