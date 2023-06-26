import Axios from 'axios'
import { utilService } from '@/services/util.service.js'

let axios = Axios.create({
    withCredentials: false
})

export const bitcoinService = {
    getRate,
    getMarketPriceHistory,
    getAvgBlockSize,
}


async function getRate() {
    const rateExchange = utilService.loadFromStorage('rateExchange')
    if (rateExchange) return rateExchange
    try {
        const res = await axios.get('https://blockchain.info/tobtc?currency=USD&value=1&cors=true')
        utilService.saveToStorage('rateExchange', res.data)
        return res.data
    } catch (error) {
        console.log('error', error)
        throw error
    }
}

async function getMarketPriceHistory() {
    const marketPriceHistory = utilService.loadFromStorage('marketPriceHistory')
    if (marketPriceHistory) return marketPriceHistory
    try {
        const res = await axios.get('https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true')
        const modifiedObject = createModified(res.data)
        utilService.saveToStorage('marketPriceHistory', modifiedObject)
        return modifiedObject
    } catch (error) {
        console.log('error', error)
        throw error
    }
}

async function getAvgBlockSize() {
    const avgBlockSize = utilService.loadFromStorage('avgBlockSize')
    if (avgBlockSize) return avgBlockSize
    try {
        const res = await axios.get('https://api.blockchain.info/charts/avg-block-size?timespan=5months&format=json&cors=true')
        const modifiedObject = createModified(res.data)
        utilService.saveToStorage('avgBlockSize', modifiedObject)
        return modifiedObject
    } catch (error) {
        console.log('error', error)
        throw error
    }
}

function createModified(object = {}) {
    let modifiedObject = {}
    for (let key in object) {
        modifiedObject[key] = object[key]
        if (key === 'values') {
            modifiedObject[key] = modifiedObject[key].map(value => {
                const date = new Date(value.x * 1000)
                const day = date.getDate()
                const month = date.getMonth() + 1
                const year = date.getFullYear()
                const convertedDate = { day, month, year }
                return {
                    convertedDate,
                    value: value.y,
                }
            })
        }

    }
    return modifiedObject
}