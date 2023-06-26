<template>
    <div class="transactions-list-container" v-if="transactions.length">
        <h2>My last transactions</h2>
        <ul>
            <li v-for="transaction in transactions.slice(0, 3)" :key="transaction._id">
                <p>Amount {{ transaction.amount }}&#8383;</p>
                <p>To {{ transaction.to }}</p>
                <p>At {{ date(transaction.at) }}</p>
            </li>
        </ul>
    </div>
</template>
  
<script>
export default {
    props: {
        transactions: { type: Array, required: true },
    },
    computed: {
        date() {
            return (timestamp) => {
                const date = new Date(timestamp)

                const day = String(date.getDate()).padStart(2, '0')
                const month = String(date.getMonth() + 1).padStart(2, '0')
                const year = date.getFullYear()
                const hours = String(date.getHours()).padStart(2, '0')
                const minutes = String(date.getMinutes()).padStart(2, '0')

                return `${day}/${month}/${year} ${hours}:${minutes}`
            };
        },
    },
};
</script>
  
<style lang="scss">
.transactions-list-container {
    ul {
        list-style: none;

        li {
            display: flex;
            column-gap: 1em;
        }
    }
}
</style>
  