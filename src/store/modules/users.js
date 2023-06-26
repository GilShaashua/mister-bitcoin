import { userService } from '@/services/user.service.js'

export default {
    state() {
        return {
            user: userService.getLoggedinUser(),
        }
    },
    mutations: {
        setLoggedinUser(state, { loggedinUser }) {
            state.user = loggedinUser
        }
    },
    actions: {
        loadLoggedinUser({ commit }) {
            const loggedinUser = userService.getLoggedinUser()
            commit({ type: 'setLoggedinUser', loggedinUser })
        },
    },
    getters: {
        getUser(state) {
            return state.user
        },
    },
}
