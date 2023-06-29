<template>
  <section class="contacts-index-container">
    <ContactsFilter @filter="onSetFilterBy" />
    <h1 class="flex justify-center" v-if="!contacts">Loading ...</h1>
    <ContactsList @remove="removeContact" v-if="contacts" :contacts="contacts" />
  </section>
</template>

<script>
import { bitcoinService } from '@/services/bitcoin.service.js'
import ContactsFilter from '../components/ContactsFilter.vue'
import ContactsList from '@/components/ContactsList.vue'
import { showSuccessMsg, showErrorMsg } from '@/services/eventBus.service.js'

export default {
  data() {
    return {
      filterBy: { txt: '' },
      marketPriceHistory: null,
      avgBlockSize: null,
    }
  },
  methods: {
    async removeContact(contactId) {
      try {
        this.$store.dispatch({ type: 'removeContact', contactId })
        showSuccessMsg('Contact removed!')
      } catch (err) {
        showErrorMsg('Cannot remove contact!')
      }
    },
    async onSetFilterBy(filterBy) {
      this.filterBy = filterBy
    },
  },
  computed: {
    contacts() { return this.$store.getters.contacts }
  },
  watch: {
    filterBy: {
      async handler() {
        this.$store.dispatch({ type: 'loadContacts', filterBy: this.filterBy })
      },
      deep: true,
    }
  },
  async created() {
    this.$store.dispatch({ type: 'loadContacts', filterBy: this.filterBy })
    this.marketPriceHistory = await bitcoinService.getMarketPriceHistory()
    this.avgBlockSize = await bitcoinService.getAvgBlockSize()
  },
  components: {
    ContactsList,
    ContactsFilter
  }
}
</script>
  
<style></style>