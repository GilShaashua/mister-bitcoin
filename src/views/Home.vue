<template>
  <section class="home-container full main-layout">
    <section class="hero-container full">
      <img class="img-hero"
        src="https://res.cloudinary.com/dpbcaizq9/image/upload/v1687726585/misterBitcoin/bitcoin-hero_abfs7x.jpg"
        alt="hero">
      <div class="hero-content main-layout">
        <div class="hero-content-inner-container">
          <h1>Welcome to misterBitcoin</h1>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque blanditiis sint consectetur dolorem,
            voluptatibus necessitatibus suscipit delectus nostrum consequuntur tempore esse eum est magnam, corrupti odio
            nulla rem atque voluptatum!</p>
          <RouterLink to="/contacts">
            <button>Start here</button>
          </RouterLink>
        </div>
      </div>
    </section>
    <section v-if="rate" class="info-container full main-layout">
      <div class="info-inner-container" v-if="user">
        <h2>Hello {{ user.username }}</h2>
        <p>Your balance is <span>{{ user.balance }}&#8383</span></p>
        <p>Current rate is <span>{{ rate }}</span></p>
      </div>
    </section>
  </section>
</template>

<script>
import { RouterLink } from 'vue-router'
import { userService } from '@/services/user.service.js'
import { bitcoinService } from '@/services/bitcoin.service.js'
export default {
  data() {
    return {
      rate: null,
    };
  },
  computed: {
    user() { return this.$store.getters.getUser }
  },
  async created() {
    this.rate = await bitcoinService.getRate()
    if (!this.user) this.$router.push('/signup')
  },
  components: { RouterLink }
}
</script>

<style></style>