import { createStore } from 'vuex'
import contacts from './modules/contacts.js'
import users from './modules/users.js'

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
        users
    }
}
const store = createStore(storeOptions)
export default store