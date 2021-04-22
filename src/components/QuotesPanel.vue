<template>
    <div class="global-model__quotes">
        <div class="quotes__grid">
            <p>Валютные пары</p>
            <p>Изменение</p>
            <p>Цена</p>
        </div>
        <div class="quotes__grid" v-for="n in 4" @click='changeCurrency(n-1)'>
            <p>USD | {{arrСurrency[n - 1]}}</p>
            <div class="quotes__percent">
                <img v-if="arrow[n-1]" src="../assets/Arrow_up.png" >
                <img v-else src="../assets/Arrow_down.png" >
                <p>{{arrQuotation[n-1] | percent(n-1, arrow)}}</p>
            </div>
            <p>{{arrQuotation[n-1] | close}}</p>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import ccStreamer from '../socket'

export default {
    data() {
        return {
            FSYM: "BTC",
            arrow: [false, false, false, false]
        }
    },
    filters: {
        close(quotation) {
            return quotation[quotation.length - 1 ].close
        },
        percent(quotation, index, arrow) {
            let test = 0
            if (quotation[quotation.length - 1].close > quotation[quotation.length - 2].close) {
                test =  (quotation[quotation.length - 1].close - quotation[quotation.length - 2].close) / quotation[quotation.length - 1].close * 100
                arrow[index] = true    
            }
            if (quotation[quotation.length - 1].close < quotation[quotation.length - 2].close) {
                test =  (quotation[quotation.length - 2].close - quotation[quotation.length - 1].close) / quotation[quotation.length - 2].close * 100
                arrow[index] = false
            }
            return  test ?  `${test.toFixed(3)} %` : test
        }
    },
    created() {
        const then = this
        ccStreamer.onmessage = function onStreamMessage(message) {
            var message = JSON.parse(event.data);
            if (message.TYPE === '0' && message.FSYM != then.FSYM) {
                then.FSYM = message.FSYM
                then.$store.dispatch('addQuotation', message)
            }
        }
    },
    computed: {
        ...mapGetters([
            'arrQuotation',
            'arrСurrency'
        ])
    },
    methods: {
        changeCurrency(n) {
            this.$store.dispatch('changeActiveCurrency', n)
        }
    }
}
</script>
