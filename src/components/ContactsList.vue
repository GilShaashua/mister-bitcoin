<template>
    <TransitionGroup name="list" tag="ul" class="contacts-list">
        <li v-for="contact in contacts" :key="contact._id">
            <ContactPreview :contact="contact" />
            <section class="actions flex align-center justify-center">
                <RouterLink :to="`/contacts/${contact._id}`">
                    <button>Details</button>
                </RouterLink>
                <button @click="onRemoveContact(contact._id)">Remove</button>
            </section>
        </li>
    </TransitionGroup>
</template>
    
<script>
import ContactPreview from './ContactPreview.vue'
export default {
    props: {
        contacts: { type: Array, required: true },
    },
    data() {
        return {};
    },
    methods: {
        onRemoveContact(contactId) {
            this.$emit('remove', contactId)
        }
    },
    async created() {
    },
    components: {
        ContactPreview
    }
}
</script>
    
<style lang="scss">
.list-move,
/* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
    transition: all 0.3s ease-in-out;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
    position: absolute;
}
</style>