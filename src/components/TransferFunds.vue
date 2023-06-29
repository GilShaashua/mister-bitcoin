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
import { showErrorMsg } from '@/services/eventBus.service.js'
import { showSuccessMsg } from '@/services/eventBus.service.js'
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
    computed: {
        user() { return this.$store.getters.getUser }
    },
    methods: {
        async onTransfer() {
            if (!this.user) {
                this.amount = ''
                return showErrorMsg('Please login!')
            }
            try {
                await userService.transferFunds(this.contactId, this.contactName, this.amount)
                this.$store.dispatch({ type: 'loadLoggedinUser' })
                this.amount = ''
                showSuccessMsg('Transfered successfully!')
            } catch (err) {
                console.log('Error', err)
                this.amount = ''
                showErrorMsg('Cannot transfer!')
            }
        }
    }
}
</script>

<style lang="scss"></style>