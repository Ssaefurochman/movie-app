export default function ({ app, redirect }) {
  app.$axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 401) {
      // if the 401 coming from reset password form, do not check for token
      app.store.dispatch('user/removeDeadToken')
      setTimeout(function () {
        redirect('/login')
      }, 3000)
    }
  })
}
