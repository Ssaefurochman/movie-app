<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="doLogout()">
          <v-list-item-action>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="'logout'" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-app-bar-title>Movie Apps</v-app-bar-title>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
    <v-snackbar v-model="snackbar.view" :color="snackbar.color" :timeout="2500" bottom multi-line>
      {{ snackbar.message }}
      <template #action="{ attrs }">
        <v-btn dark depressed v-bind="attrs" @click="snackbar.view = false">
          tutup
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Home',
          to: '/'
        },
        {
          icon: 'mdi-heart',
          title: 'Favourite',
          to: '/favourite'
        },
        {
          icon: 'mdi-filmstrip',
          title: 'Wathed',
          to: '/watched'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
      snackbar: { view: false, color: 'success', message: '' }
    }
  },
  created () {
    this.$nuxt.$on('EAT_SNACKBAR', (theSnack) => {
      if (theSnack.message instanceof Error) {
        const theError = theSnack.message
        let theMessage = theError
        if (theError.response) {
          theMessage = `${theError.response.status} : ${theError.response.data.error.message}`
        }
        theSnack.message = theMessage
      }
      this.snackbar = theSnack
    })
  },
  methods: {
    doLogout () {
      this.$store.dispatch('user/doLogout')
      this.$router.push('/login')
    }
  }
}
</script>
