<template>
    <v-card class="elevation-12">
        <v-toolbar dark color="primary">
            <v-toolbar-title>Register form</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-tooltip right>
                <template v-slot:activator="{ on }">
                    <v-btn icon large href="https://codepen.io/johnjleider/pen/wyYVVj" target="_blank" v-on="on">
                        <v-icon large>mdi-codepen</v-icon>
                    </v-btn>
                </template>
                <span>Codepen</span>
            </v-tooltip>
        </v-toolbar>
        <v-card-text>
            <v-form @submit.prevent="register">
                <v-text-field prepend-icon="person" v-model="username" label="Username" type="text"></v-text-field>
                <v-text-field prepend-icon="person" v-model="realname" label="Real name" type="text"></v-text-field>
                <v-text-field id="password" prepend-icon="lock" v-model="password" label="Password" type="password"></v-text-field>
                <v-text-field prepend-icon="compare_arrows" v-model="mmr" label="Approximate MMR" type="text"></v-text-field>
                <v-text-field prepend-icon="compare_arrows" v-model="country" label="Country" type="text"></v-text-field>
                <v-flex xs12 sm6 d-flex>
                    <v-select
                                                                                              v-model="main_race"
                                                                                              :items="races"
                                                                                              label="Main race"
                                                                                              ></v-select>
                </v-flex>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn type='submit' color="primary">Register</v-btn>
                </v-card-actions>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: 'RegisterForm',
    data() {
        return {
            realname: '',
            username: '',
            password: '',
            error: '',
            mmr: '',
            country: '',
            main_race: '',
            races: ['Zerg', 'Protoss', 'Terran', 'Random'],
        }
    },
    computed: {
    },
    methods: {
        async register() {

            console.log('main race: ' + this.main_race);
            try {
                this.error = await this.$store.dispatch("register", {
                    name: this.realname,
                    username: this.username,
                    password: this.password,
                    main_race: this.main_race,
                    country: this.country,
                    mmr: this.mmr
                });
                if (this.error === "") {
                    this.$router.push('leaderboard');
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
}
</script>
