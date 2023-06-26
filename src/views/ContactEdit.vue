<template>
    <section class="contact-edit-container flex justify-center">
        <form @submit.prevent="save" v-if="contact" class="contact-edit">
            <input v-model="contact.name" type="text" placeholder="Enter contact name">
            <input v-model="contact.email" type="email" placeholder="Enter contact email">
            <input v-model="contact.phone" type="text" placeholder="Enter contact phone">
            <button>Save</button>
            <RouterLink to="/contacts">
                <button>Back</button>
            </RouterLink>
        </form>
    </section>
</template>

<script>
import { contactService } from '@/services/contact.service.js'
import { showSuccessMsg, showErrorMsg } from '@/services/eventBus.service.js'

export default {
    data() {
        return {
            contact: contactService.getEmptyContact(),
        }
    },
    computed: {
        contactId() {
            return this.$route.params.id
        }
    },
    watch: {
        contactId() {
            this.loadContact()
        }
    },
    methods: {
        async save() {
            try {
                await contactService.saveContact(this.contact)
                this.$router.push('/contacts')
                showSuccessMsg('Contact saved!')
            } catch (err) {
                console.log('err', err);
                showErrorMsg('Cannot save contact')
            }
        },
        async loadContact() {
            try {
                const { contactId } = this
                this.contact = await contactService.getContactById(contactId)
            } catch (err) {
                console.log('err', err)
                showErrorMsg('Cannot load contact')
            }

        }
    },
    async created() {
        if (this.contactId) {
            this.loadContact()
        }
    }
}
</script>

