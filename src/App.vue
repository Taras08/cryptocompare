<template>
  <div>
    <div v-if="arrQuotation.length === 4 ">
      <router-view/>
    </div>
    <p v-else> Идёт заагрузка</p>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  data() {
    return {
      downloaded: false
    }
  },
  computed: {
    ...mapGetters([
      'arrQuotation'
    ])
  },
  created() {
    this.$store.dispatch('getQuotation')
  }
}
</script>

