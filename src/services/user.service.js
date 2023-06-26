import { storageService } from '@/services/async-storage.service.js'
import { utilService } from '@/services/util.service.js'

const STORAGE_KEY = 'user_db'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

_createUserDB()

export const userService = {
    getLoggedinUser,
    signup,
    logout,
    transferFunds,
    getTransactions,
}

async function signup(username) {
    const users = utilService.loadFromStorage(STORAGE_KEY) || []
    const user = users.find(user => user.username === username)
    if (user) _setLoggedinUser(user)
    else {
        const newUser = { username, balance: 100, transactions: [] }
        const savedUser = await storageService.post(STORAGE_KEY, newUser)
        _setLoggedinUser(savedUser)
    }
}

function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

async function transferFunds(contactId, contactName, amount) {
    const transaction = { toId: contactId, to: contactName, at: Date.now(), amount }
    const user = getLoggedinUser()
    if (user) {
        user.transactions = [transaction, ...user.transactions]
        user.balance -= amount
        await storageService.put('user_db', user)
        _setLoggedinUser(user)
        const contacts = await storageService.query('contacts_db')
        const contact = contacts.find(contact => contact._id === contactId)
        if (contact) {
            if (!contact.balance) contact.balance = 0
            contact.balance += amount
            await storageService.put('contacts_db', contact)
        }
    }
}

function getTransactions() {

}

function _setLoggedinUser(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
}

function _createUserDB() {
    const users = utilService.loadFromStorage(STORAGE_KEY) || []
    if (!users || !users.length) {
        utilService.saveToStorage(STORAGE_KEY, users)
    }
}