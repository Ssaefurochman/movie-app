<template>
  <v-container>
    <v-row>
      <v-col v-for="(item, index) in movies" :key="index" cols="6" sm="4" md="3">
        <v-card>
          <v-img
            height="250"
            :src="`https://image.tmdb.org/t/p/w500${item.poster_path}`"
          />
          <v-card-text
            class="pt-6"
            style="position: relative;"
          >
            <v-btn
              absolute
              color="orange"
              class="white--text"
              fab
              right
              top
              @click="addFavourite(item)"
            >
              <v-icon>mdi-heart</v-icon>
            </v-btn>
            <div class="font-weight-light orange--text mb-2">
              {{ item.title }}
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn color="success" block :to="`details/${item.id}`">
              details
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-btn color="primary" :disabled="page === 1" @click="page -= 1; loadData()">
        Previous
      </v-btn>
      <v-spacer />
      <v-btn color="primary" width="120" @click="page += 1; loadData()">
        Next
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      page: 1
    }
  },
  computed: {
    ...mapState({
      movies: state => state.movies.movies
    })
  },
  created () {
    this.loadData()
  },
  methods: {
    ...mapMutations('favourite', [
      'addToFavourite'
    ]),
    async loadData () {
      try {
        await this.$store.dispatch('movies/getMovies', { page: this.page })
      } catch (error) {
        console.log(error)
      }
    },
    addFavourite (item) {
      try {
        this.addToFavourite(item)
        this.$nuxt.$emit('EAT_SNACKBAR', {
          view: true,
          color: 'success',
          message: 'added to favourite'
        })
      } catch (error) {
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
