<template>
    <section class="statistics-container flex column align-center">
        <div class="charts-container flex align-center justify-center">
            <div class="avg-block-size-container flex column align-center justify-center">
                <h2>Average block size - MB</h2>
                <h1 v-if="!avgBlockSize" class="flex justify-center">Loading ...</h1>
                <PieChart v-if="avgBlockSize" :avgBlockSize="avgBlockSize" />
            </div>
            <div class="market-price-history-container flex column align-center justify-center">
                <h2>Average market price history - USD</h2>
                <h1 v-if="!marketPriceHistory" class="flex justify-center">Loading ...</h1>
                <PieChart v-if="marketPriceHistory" :marketPriceHistory="marketPriceHistory" />
            </div>
        </div>
    </section>
</template>

<script>
import PieChart from '../components/PieChart.vue';
import { bitcoinService } from '@/services/bitcoin.service.js'
export default {
    components: { PieChart },
    data() {
        return {
            avgBlockSize: null,
            marketPriceHistory: null,
        }
    },
    async created() {
        this.avgBlockSize = await bitcoinService.getAvgBlockSize()
        this.marketPriceHistory = await bitcoinService.getMarketPriceHistory()
    },
}
</script>

<style lang="scss">
.statistics-container {
    // margin-block: 2em;

    .charts-container {
        column-gap: 3em;

        .avg-block-size-container {
            margin-block: 2em;
        }

        .market-price-history-container {
            margin-block: 2em;
        }
    }

}
</style>