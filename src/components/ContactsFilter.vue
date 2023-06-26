<template>
    <div class="filter-contacts-container flex align-center justify-center">
        <RouterLink to="/contacts/edit"><button>Add contact</button></RouterLink>
        <form @submit.prevent="onSetFilterBy">
            <input v-model="filterBy.txt" type="search" name="term" id="term" placeholder="Search here ...">
        </form>
    </div>
</template>

<script>
import { RouterLink } from 'vue-router'
export default {
    data() {
        return {
            filterBy: {
                txt: ''
            }
        };
    },
    methods: {},
    watch: {
        filterBy: {
            handler() {
                this.$emit("filter", this.filterBy);
            },
            deep: true,
        }
    },
    components: { RouterLink }
}
</script>

<style lang="scss"></style>