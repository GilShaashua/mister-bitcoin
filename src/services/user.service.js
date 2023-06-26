import { storageService } from '@/services/async-storage.service.js'
import { utilService } from '@/services/util.service.js'

const STORAGE_KEY = 'user_db'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

_createUserDB()

export const userService = {
    getLoggedinUser,
    signup
}

async function signup(username) {
    const users = utilService.loadFromStorage(STORAGE_KEY)
    const user = users.find(user => user.username === username)
    if (user) _setLoggedinUser(user)
    else {
        const newUser = { username, balance: 100, transactions: [] }
        const savedUser = await storageService.post(STORAGE_KEY, newUser)
        _setLoggedinUser(savedUser)
    }
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    // const userToSave = { _id: user._id, fullname: user.fullname, score: user.score }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
    // return userToSave
}

function _createUserDB() {
    const users = utilService.loadFromStorage(STORAGE_KEY) || []
    if (!users || !users.length) {
        utilService.saveToStorage(STORAGE_KEY, users)
    }
}