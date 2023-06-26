<template>
  <header class="app-header full main-layout">
    <div class="app-header-inner-container flex space-between align-center">
      <div class="logo">
        <h1>misterBitcoin</h1>
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
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>
</template>

<script>
import { bitcoinService } from '@/services/bitcoin.service.js'
export default {
  data() {
    return {
      rate: null,
    }
  },
  computed: {
    user() { return this.$store.getters.getUser }
  },
  async created() {
    this.rate = await bitcoinService.getRate()
  }

}
</script>

<style></style>