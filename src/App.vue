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
                       <v-list-tile-title>Login/Register</v-list-tile-title>
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
        </v-toolbar>
        <v-content>
            <v-container fluid fill-height>
                <v-layout justify-center align-center>
                    <v-flex shrink>
                        <router-view />
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
        <v-footer app fixed>
            <span>&copy; 2019 Cade Daniel</span>
        </v-footer>
    </v-app>
</template>

<script>
export default {
    data: () => ({
        drawer: null,
        user: null,
    }),
    props: {
        source: String
    }
}
</script>
