<template>
    <div>
        <h2>StarCraft Twitch Streams</h2>
        <v-data-table v-if="twitchStreams != null" hide-actions disable-initial-sort :headers="headers" :items="twitchStreams" class="elevation-1">
            <template v-slot:items="props">
                <tr :style="{ cursor: 'pointer'}" @click="goToStream(props.item.user_name)">
                    <td class="text-xs-right"><img :src="props.item.thumbnail_url" /></td>
                    <td class="text-xs-right">{{ props.item.viewer_count}}</td>
                    <td class="text-xs-right">{{ props.item.user_name}}</td>
                    <td class="text-xs-right">{{ props.item.title }}</td>
                    <td class="text-xs-right">{{ props.item.language}}</td>
                </tr>
            </template>
        </v-data-table>
        <div v-else>
            Loading streams...
        </div>
    </div>
</template>

<script>
export default {
    name: 'current_streamers',
    components: {
    },
    data () {
        return {
            headers: [
            { text: 'Thumbnail', value: 'thumbnail_url' },
            { text: 'Viewers', value: 'viewer_count', sortable: true},
            { text: 'Host', value: 'user_name' },
            { text: 'Title', value: 'title' },
            { text: 'language', value: 'language' },
            ],
        }
    },
    computed: {
        twitchStreams() {
            let streams = this.$store.state.twitchStreams;
            for (let i in streams) {
                streams[i].thumbnail_url = streams[i].thumbnail_url.replace('{width}', '80').replace('{height}', '55')
            }
            return streams
        }
    },
    async created() {
        await this.$store.dispatch('getTwitchStreams');
    },
    methods: {
        goToStream(username) {
            window.location.href = 'https://twitch.tv/' + username;
        }
    }
}
</script>
