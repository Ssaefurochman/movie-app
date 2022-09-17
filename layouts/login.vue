<template>
  <v-app light>
    <div>
      <nuxt />
    </div>
  </v-app>
</template>
<script>
export default {
  middleware: 'isUnauthenticated',
  data () {
    return {
    }
  },
  created () {
  }
}
</script>
