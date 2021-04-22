<template>
  <div class="global-model">
    <div class="global-model__logo">
      <img  src="../assets/logo.png" alt="">
    </div>
    <div class="global-model__header">
      <h4 class="global-model__title">Панель котировок</h4>
    </div>
    <Chart></Chart>
    <QuotesPanel></QuotesPanel>
  </div>
</template>

<script>
import QuotesPanel from '../components/QuotesPanel'
import Chart from '../components/Сhart'
import {mapGetters} from 'vuex'

export default {
  name: 'Home',
  components: {
    QuotesPanel,
    Chart
  },
  computed: {
    ...mapGetters([
      'arrQuotation'
    ])
  }  
}
</script>
