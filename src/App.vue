<template>
    <v-app id="inspire" dark>
        <v-navigation-drawer
           v-model="drawer"
           clipped
           fixed
           app
           >
           <v-list dense>
               <v-list-tile v-if="user" to="/profile">
                   <v-list-tile-action>
                       <v-icon>face</v-icon>
                   </v-list-tile-action>
                   <v-list-tile-content>
                       <v-list-tile-title>Profile</v-list-tile-title>
                   </v-list-tile-content>
               </v-list-tile>
               <v-list-tile v-if="!user" to="/login">
                   <v-list-tile-action>
                       <v-icon>account_circle</v-icon>
                   </v-list-tile-action>
                   <v-list-tile-content>
                       <v-list-tile-title>Login</v-list-tile-title>
                   </v-list-tile-content>
               </v-list-tile>
               <v-list-tile v-if="!user" to="/register">
                   <v-list-tile-action>
                       <v-icon>assignment</v-icon>
                   </v-list-tile-action>
                   <v-list-tile-content>
                       <v-list-tile-title>Register</v-list-tile-title>
                   </v-list-tile-content>
               </v-list-tile>
               <v-list-tile to="/leaderboard">
                   <v-list-tile-action>
                       <v-icon>list</v-icon>
                   </v-list-tile-action>
                   <v-list-tile-content>
                       <v-list-tile-title>Leaderboard</v-list-tile-title>
                   </v-list-tile-content>
               </v-list-tile>
               <v-list-tile to="/current_streamers">
                   <v-list-tile-action>
                       <v-icon>video_call</v-icon>
                   </v-list-tile-action>
                   <v-list-tile-content>
                       <v-list-tile-title>Current Streamers</v-list-tile-title>
                   </v-list-tile-content>
               </v-list-tile>
               <v-list-tile to="/popular_videos">
                   <v-list-tile-action>
                       <v-icon>video_library</v-icon>
                   </v-list-tile-action>
                   <v-list-tile-content>
                       <v-list-tile-title>Popular Videos</v-list-tile-title>
                   </v-list-tile-content>
               </v-list-tile>
           </v-list>
        </v-navigation-drawer>
        <v-toolbar app fixed clipped-left>
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title>StarStats</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down">
                <v-btn flat v-if="user" @click='logout'>Log out</v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <v-content>
            <v-container fluid>
                <v-layout justify-center align-center>
                    <router-view />
                </v-layout>
            </v-container>
        </v-content>
        <v-footer app fixed>
            <span>&copy; 2019 Cade Daniel. <a href="https://github.com/cadedaniel/creative">GitHub</a></span>
        </v-footer>
    </v-app>
</template>

<script>
export default {
    data: () => ({
        drawer: null,
    }),
    props: {
        source: String
    },
    computed: {
        user() {
            return this.$store.state.user;
        }
    },
    methods: {
        async logout() {

            try {
                this.error = await this.$store.dispatch("logout");
                if (this.error === "") {
                    this.$router.push('login');
                }
            } catch (error) {
                console.log(error);
            }
        }
    },
    async created() {
        await this.$store.dispatch('getUser');
    }
}
</script>
