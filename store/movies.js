export const state = () => ({
  movies: []
})

export const actions = {
  async getMovies ({ rootState, commit, dispatch }, payload) {
    try {
      const { data: movie } = await this.$axios.get(`/movie/popular?api_key=${rootState.user.token}&language=en-US&page=${payload.page}`)

      commit('setMovies', movie.results)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

export const mutations = {
  setMovies (state, payload) {
    state.movies = payload
  }
}
