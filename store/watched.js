export const state = () => ({
  watched: []
})

export const actions = {
}

export const mutations = {
  addToWatched (state, payload) {
    const index = state.watched.findIndex(v => v.id === payload.id)
    if (index === -1) {
      state.watched.push(payload)
    }
  },
  addReview (state, payload) {
    const idx = state.watched.findIndex(v => v.id === payload.id)
    state.watched[idx].review = payload.review
  }
}
