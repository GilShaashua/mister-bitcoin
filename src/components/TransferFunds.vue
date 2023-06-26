<template>
    <div class="transfer-funds-container">
        <form @submit.prevent="onTransfer">
            <input v-model.number="amount" type="number" name="transfer-funds" id="transfer-funds"
                placeholder="Enter amount to transfer">
            <button>Transfer</button>
        </form>
    </div>
</template>

<script>
import { userService } from '@/services/user.service.js'
export default {
    props: {
        contactId: { type: String, required: true },
        contactName: { type: String, required: true },
    },
    data() {
        return {
            amount: ''
        }
    },
    methods: {
        onTransfer() {
            userService.transferFunds(this.contactId, this.contactName, this.amount)
            this.$store.dispatch({ type: 'loadLoggedinUser' })
        }
    }
}
</script>

<style lang="scss"></style>