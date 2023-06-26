<template>
    <article class="contact-preview flex column align-center justify-center">
        <img :src="imageUrl" :alt="contact.name">
        <h3>{{ contact.name }}</h3>
        <p>{{ contact.email }}</p>
        <p>{{ contact.phone }}</p>
    </article>
</template>
    
<script>
export default {
    props: {
        contact: { type: Object, required: true },
    },
    data() {
        return {
            imageUrl: `https://robohash.org/${this.contact.name}.png?set=set5`
        }
    },
    methods: {

    },
    async created() {

    },
}
</script>
    
<style></style>