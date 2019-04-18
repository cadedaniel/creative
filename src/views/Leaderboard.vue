<template>
    <div>
        <h2>StarCraft Leaderboard</h2>
        <div>This data is all mocked right now because the company behind StarCraft accidentally depcrecated the API for getting rank / MMR.</div>
        <v-data-table v-if="ranks != null" hide-actions :headers="headers" :items="ranks" class="elevation-1">
            <template v-slot:items="props">
                <td>{{ props.item.rank }}</td>
                <td class="text-xs-right">{{ props.item.mmr }}</td>
                <td class="text-xs-right">{{ props.item.username}}</td>
                <td class="text-xs-right">{{ props.item.main_race }}</td>
                <td class="text-xs-right">{{ props.item.name}}</td>
                <td class="text-xs-right">{{ props.item.country}}</td>
            </template>
        </v-data-table>
        <div v-else>
            Loading...
        </div>
    </div>
</template>

<script>
export default {
    name: 'leaderboard',
    components: {
    },
    data () {
        return {
            headers: [
            {
                text: 'Rank',
                align: 'left',
                sortable: true,
                value: 'rank'
            },
            { text: 'MMR', value: 'mmr' },
            { text: 'ID', value: 'username' },
            { text: 'Main Race', value: 'main_race' },
            { text: 'Name', value: 'name' },
            { text: 'Country', value: 'country' },
            ],
        }
    },
    computed: {
        ranks() {
            return this.$store.state.leaderboard;
        }
    },
    async created() {
        await this.$store.dispatch('getLeaderboard');
    },
    methods: {
    }
}
</script>
