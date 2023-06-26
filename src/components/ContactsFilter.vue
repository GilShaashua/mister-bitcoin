<template>
    <div class="filter-contacts-container flex align-center justify-center">
        <form @submit.prevent="onSetFilterBy">
            <input v-model="filterBy.term" type="search" name="term" id="term" placeholder="Search here ...">
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            filterBy: {
                term: ''
            }
        }
    },
    methods: {

    },
    watch: {
        filterBy: {
            handler() {
                this.$emit('filter', this.filterBy)
            },
            deep: true,
        }
    }
}
</script>

<style lang="scss"></style>