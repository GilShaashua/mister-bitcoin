import { createStore } from 'vuex'
import contacts from './modules/contacts.js'

const storeOptions = {
    strict: true,
    state() {
        return {
            count: 10,
        }
    },
    mutations: {
        increment(state) {
            state.count++
        },
        setCount(state, { val }) {
            state.count = val
        }
    },
    getters: {
        count(state) { return state.count }
    },
    modules: {
        contacts,
    }
}
const store = createStore(storeOptions)
export default store