<template>
    <div class="chart-container" :style="chartContainerStyle">
        <Pie id="my-chart-id" :options="chartOptions" :data="chartData" />
    </div>
</template>
  
<script>
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

export default {
    name: 'PieChart',
    components: { Pie },
    props: {
        marketPriceHistory: { type: Object, required: false },
        avgBlockSize: { type: Object, required: false }
    },
    data() {
        return {
            chartData: {
                labels: ['January', 'February', 'March'],
                datasets: [{ data: [40, 20, 12] }]
            },
            chartOptions: {
                responsive: true,
                width: 600
            }
        }
    },
    computed: {
        chartContainerStyle() {
            return {
                width: '400px',
                height: '400px'
            }
        }
    },
    created() {
        console.log(this.marketPriceHistory, this.avgBlockSize)
        if (this.avgBlockSize) this.calcAvgPerMonthBlockSize()
        if (this.marketPriceHistory) this.calcAvgPerMonthMarketPrice()
    },
    methods: {
        calcAvgPerMonthBlockSize() {
            const monthsMap = {}
            this.avgBlockSize.values.forEach(value => {
                if (!monthsMap[value.convertedDate.month]) monthsMap[value.convertedDate.month] = []
                monthsMap[value.convertedDate.month].push(value.value)
            })

            const months = []
            for (let month in monthsMap) {
                if (month === '1') months.push('January')
                else if (month === '2') months.push('February')
                else if (month === '3') months.push('March')
                else if (month === '4') months.push('April')
                else if (month === '5') months.push('May')
                else months.push('June')
            }

            const avgPerMonth = []
            for (let month in monthsMap) {
                const avgValuesPerMonth = monthsMap[month].reduce((acc, currVal) => {
                    return acc + currVal
                }, 0)
                avgPerMonth.push(avgValuesPerMonth / monthsMap[month].length)
            }

            this.chartData.labels = months
            this.chartData.datasets = [{
                data: avgPerMonth,
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#8C54FF',
                    '#FF8C00',
                    '#00FF7F'
                ]
            }]
        },
        calcAvgPerMonthMarketPrice() {
            const monthsMap = {}
            this.marketPriceHistory.values.forEach(value => {
                if (!monthsMap[value.convertedDate.month]) monthsMap[value.convertedDate.month] = []
                monthsMap[value.convertedDate.month].push(value.value)
            })

            const months = []
            for (let month in monthsMap) {
                if (month === '1') months.push('January')
                else if (month === '2') months.push('February')
                else if (month === '3') months.push('March')
                else if (month === '4') months.push('April')
                else if (month === '5') months.push('May')
                else months.push('June')
            }

            const avgPerMonth = []
            for (let month in monthsMap) {
                const avgValuesPerMonth = monthsMap[month].reduce((acc, currVal) => {
                    return acc + currVal
                }, 0)
                avgPerMonth.push(avgValuesPerMonth / monthsMap[month].length)
            }

            this.chartData.labels = months
            this.chartData.datasets = [{
                data: avgPerMonth,
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#8C54FF',
                    '#FF8C00',
                    '#00FF7F'
                ]
            }]
        }
    },
}
</script>

<style lang="scss"></style>