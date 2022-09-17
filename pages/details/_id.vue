<template>
  <v-container grid-list-xs>
    <v-card>
      <v-row v-if="loading" align="center" justify="center">
        Loading data ...
      </v-row>
      <v-row v-else>
        <v-col cols="3">
          <v-img :src="`https://image.tmdb.org/t/p/w500${detailMovie.poster_path}`" />
        </v-col>
        <v-col cols="9">
          <v-card-text class="text-h4 font-weight-light orange--text mb-2">
            {{ detailMovie.title }}
          </v-card-text>
          <v-card-text>
            {{ detailMovie.overview }}
          </v-card-text>
          <v-card-text>
            score: {{ detailMovie.vote_average }}
          </v-card-text>
          <v-card-text>
            <v-btn color="primary" @click="addToWatched(detailMovie)">
              Watched
            </v-btn>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data () {
    return {
      loading: false,
      detailMovie: null
    }
  },
  computed: {
    ...mapState({
      token: state => state.user.token
    })
  },
  created () {
    this.getDetails()
  },
  methods: {
    ...mapMutations('watched', [
      'addToWatched'
    ]),
    async getDetails () {
      this.loading = true
      try {
        const { data: detail } = await this.$axios.get(`/movie/${this.$route.params.id}?api_key=${this.token}&language=en-US`)
        this.detailMovie = detail
        this.loading = false
      } catch (error) {
        this.loading = false
        this.$nuxt.$emit('EAT_SNACKBAR', {
          view: true,
          color: 'error',
          message: error
        })
      }
    }
  }
}
</script>
