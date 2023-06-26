<template>
    <section class="signup-container flex column align-center">
        <h1>Sign up</h1>
        <p>And get 100 coins for free</p>
        <form @submit.prevent="createUser">
            <input v-model="username" type="text" name="username" id="username" placeholder="Enter username">
            <button>Create an account</button>
        </form>
    </section>
</template>

<script>
import { userService } from '@/services/user.service.js'
export default {
    data() {
        return {
            username: ''
        }
    },
    methods: {
        async createUser() {
            await userService.signup(this.username)
            this.$store.dispatch({ type: 'loadLoggedinUser' })
            this.$router.push('/')
        }
    }
}
</script>

<style lang="scss"></style>