import { contactService } from '@/services/contact.service.js'

export default {
    state() {
        return {
            contacts: null,
        }
    },
    mutations: {
        setContacts(state, { contacts }) {
            state.contacts = contacts
        },
        removeContact(state, { updatedContacts }) {
            state.contacts = [...updatedContacts]
        }
    },
    actions: {
        async loadContacts({ commit }, { filterBy }) {
            const contacts = await contactService.getContacts(filterBy)
            commit({ type: 'setContacts', contacts })
        },
        async removeContact({ commit }, { contactId }) {
            const updatedContacts = await contactService.deleteContact(contactId)
            commit({ type: 'removeContact', updatedContacts })
        }
    },
    getters: {
        contacts(state) {
            return state.contacts
        },
        getContact: (state) => (contactId) => state.contacts.find(contact => contact.id === contactId)
    },
}
