export const state = () => ({
  favourites: []
})

export const actions = {
}

export const mutations = {
  addToFavourite (state, payload) {
    const index = state.favourites.findIndex(v => v.id === payload.id)
    if (index === -1) {
      state.favourites.push(payload)
    }
  }
}
