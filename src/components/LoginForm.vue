<template>
    <v-card class="elevation-12">
        <v-toolbar dark color="primary">
            <v-toolbar-title>Login form</v-toolbar-title>
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
            <v-form @submit.prevent="login">
                <v-text-field prepend-icon="person" v-model="username" label="Login" type="text"></v-text-field>
                <v-text-field id="password" prepend-icon="lock" v-model="password" label="Password" type="password"></v-text-field>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn type='submit' color="primary">Login</v-btn>
                </v-card-actions>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: 'LoginForm',
    data() {
        return {
            username: '',
            password: '',
            error: '',
        }
    },
    computed: {
    },
    methods: {
        async login() {
            try {
                this.error = await this.$store.dispatch("login", {
                    username: this.username,
                    password: this.password,
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
