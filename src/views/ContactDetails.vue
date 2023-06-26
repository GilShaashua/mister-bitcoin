<template>
    <section class="contact-details flex column align-center" v-if="contact">
        <img :src="imageUrl" :alt="contact.name">
        <h3>{{ contact.name }}</h3>
        <p>{{ contact.email }}</p>
        <p>{{ contact.phone }}</p>
        <TransferFunds :contactId="contact._id" :contactName="contact.name" />
        <RouterLink :to="`/contacts/edit/${contact._id}`">
            <button>Edit</button>
        </RouterLink>
        <RouterLink to="/contacts">
            <button>Back</button>
        </RouterLink>
    </section>
</template>
    
<script>
import { contactService } from '../services/contact.service.js';
import TransferFunds from '@/components/TransferFunds.vue'

export default {
    props: {
    },
    data() {
        return {
            contact: null,
            imageUrl: null
        }
    },
    methods: {

    },
    async created() {
        const contactId = this.$route.params.contactId
        this.contact = await contactService.getContactById(contactId)
        this.imageUrl = `https://robohash.org/${this.contact.name}.png?set=set5`
    },
    components: {
        TransferFunds,
    }
}
</script>
    
<style></style>