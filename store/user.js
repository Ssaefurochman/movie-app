export const state = () => ({
  token: null,
  username: null
})

export const actions = {
  loginAct ({ commit, dispatch }, payload) {
    const authData = payload
    commit('setAuthData', authData)
  },
  doLogout ({ commit, dispatch }) {
    commit('doLogout')
  },
  removeDeadToken ({ commit, dispatch }) {
    commit('doLogout')
  }
}

export const mutations = {
  setAuthData (state, authData) {
    state.token = '5972c8013e4cf2ee3789e88bc84d07ef'
    state.username = authData.username
    this.$axios.setToken(state.token)
  },
  doLogout (state) {
    state.username = null
    state.token = null
    this.$axios.setToken(false)
  }
}
