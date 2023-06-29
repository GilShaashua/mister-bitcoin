<template>
  <header class="app-header full main-layout">
    <div class="app-header-inner-container flex space-between align-center">
      <div class="logo flex align-center justify-center">
        <span>&#8383</span>
        <h1> misterBitcoin</h1>
      </div>
      <div class="user-details" v-if="user">
        <h3>Hello {{ user.username }}</h3>
        <p>Balance <span>{{ user.balance }}&#8383</span></p>
      </div>
      <div class="rate-exchange">
        <p>Current rate <span>{{ rate }}</span></p>
      </div>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/contacts">Contacts</RouterLink>
        <RouterLink to="/statistics">Statistics</RouterLink>
        <RouterLink v-if="user" to="/signup" @click="logout">Logout</RouterLink>
      </nav>
    </div>
  </header>
</template>

<script>
import { bitcoinService } from '@/services/bitcoin.service.js'
import { userService } from '../services/user.service'
export default {
  data() {
    return {
      rate: null,
    }
  },
  computed: {
    user() { return this.$store.getters.getUser },
  },
  async created() {
    this.rate = await bitcoinService.getRate()
  },
  methods: {
    logout() {
      userService.logout()
      this.$store.dispatch({ type: 'loadLoggedinUser' })
    },
  }

}
</script>

<style></style>