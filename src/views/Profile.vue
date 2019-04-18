<template>
    <div>
        <v-card class="elevation-20" v-if="user" height="100%">
            <v-toolbar dark color="primary">
                <v-toolbar-title>Profile: {{user.username}}</v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
                Your MMR: {{user.mmr}}.
            </v-card-text>
            <v-card-text>
                Your most played race: {{user.main_race}}.
            </v-card-text>
            <v-card-text>
                Your recent matches will be summarized below. (currently just mock data)
            </v-card-text>
            <v-data-table
                            hide-actions
                            :headers="headers"
                            :items="history"
                            class="elevation-1"
                            >
                            <template v-slot:items="props">
                                <td>{{ props.item.map }}</td>
                                <td class="text-xs-right">{{ props.item.enemy }}</td>
                                <td class="text-xs-right">{{ props.item.enemy_race }}</td>
                                <td class="text-xs-right">{{ props.item.win_loss }}</td>
                            </template>
            </v-data-table>
        </v-card>
        <login-form v-if="!user" />
    </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue'

export default {
    name: 'profile',
    components: {
        LoginForm,
    },
    data() {
        return {
            headers: [
            {
                text: 'Map',
                align: 'left',
                value: 'map'
            },
            { text: 'Opponent', value: 'enemy' },
            { text: 'Opponent Race', value: 'enemy_race' },
            { text: 'Win/loss', value: 'win_loss' },
            ],
            history: [
            {
                map: 'Fighting Spirit',
                enemy: 'DocHoliday_TV',
                enemy_race: 'Zerg',
                win_loss: 'Win',
            },
            {
                map: 'Crossing Field',
                enemy: 'george',
                enemy_race: 'Zerg',
                win_loss: 'Win',
            },
            {
                map: 'Circuit Breakers',
                enemy: 'FlaShGGre',
                enemy_race: 'Terran',
                win_loss: 'Loss',
            },
            ]
        }
    },
    computed: {
        user() {
            return this.$store.state.user;
        }
    },
    async created() {
    },
    methods: {
    }
}
</script>
