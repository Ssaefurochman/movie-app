<template>
  <v-container grid-list-xs>
    <div v-if="favourites.length === 0" align="center">
      You haven't selected your favourite movies
    </div>
    <div v-else>
      <v-card v-for="(item, i) in favourites" :key="i">
        <v-row>
          <v-col cols="3">
            <v-img :src="`https://image.tmdb.org/t/p/w500${item.poster_path}`" />
          </v-col>
          <v-col cols="9">
            <v-card-text class="text-h4 font-weight-light orange--text mb-2">
              {{ item.title }}
            </v-card-text>
            <v-card-text>
              {{ item.overview }}
            </v-card-text>
            <v-card-text>
              score: {{ item.vote_average }}
            </v-card-text>
            <v-card-text>
              <v-btn color="primary" @click="addToWatched(item)">
                Watched
              </v-btn>
            </v-card-text>
          </v-col>
        </v-row>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState({
      favourites: state => state.favourite.favourites
    })
  },
  methods: {
    ...mapMutations('watched', [
      'addToWatched'
    ])
  }
}
</script>
