import VuexP from 'vuex-persist'

export default ({ store }) => {
  new VuexP({
    /* your options */
    key: 'movie-app',
    modules: ['user']
  }).plugin(store)
}
