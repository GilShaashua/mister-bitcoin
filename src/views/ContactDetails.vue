<template>
    <section class="contact-details flex column align-center" v-if="contact">
        <img :src="imageUrl" :alt="contact.name">
        <h3>{{ contact.name }}</h3>
        <p>{{ contact.email }}</p>
        <p>{{ contact.phone }}</p>
        <RouterLink to="/contacts">
            <button>Back</button>
        </RouterLink>
    </section>
</template>
    
<script>
import { contactService } from '../services/contact.service.js';

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
    }
}
</script>
    
<style></style>