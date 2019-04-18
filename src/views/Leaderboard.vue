<template>
    <div>
        <h2>StarCraft Leaderboard</h2>
        <v-data-table :headers="headers" :items="ranks" class="elevation-1">
            <template v-slot:items="props">
                <td>{{ props.item.rank }}</td>
                <td class="text-xs-right">{{ props.item.id}}</td>
                <td class="text-xs-right">{{ props.item.country}}</td>
                <td class="text-xs-right">{{ props.item.mmr }}</td>
                <td class="text-xs-right">{{ props.item.main_race }}</td>
            </template>
        </v-data-table>
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
            { text: 'ID', value: 'id' },
            { text: 'Country', value: 'country' },
            { text: 'MMR', value: 'mmr' },
            { text: 'Main Race', value: 'main_race' },
            ],
            ranks: [
            {
                rank: '1',
                id: 'FlaShGGre',
                country: 'Korea',
                mmr: '2954',
                main_race: 'Terran',
            },
            {
                rank: '2',
                id: 'SKT_Larva',
                country: 'Korea',
                mmr: '2633',
                main_race: 'Zerg',
            },
            {
                rank: '3',
                id: 'rain_arena',
                country: 'Korea',
                mmr: '2591',
                main_race: 'Protoss',
            },
            ]
        }
    },
    computed: {
    },
    async created() {
    },
    methods: {
    }
}
</script>
