<template>
    <div>
        <h2>StarCraft Replay Video Submissions</h2>
        <div v-if="!user">Login to submit your own links</div>
        <v-data-table v-if="submissions != null" hide-actions disable-initial-sort :headers="headers" :items="submissions" class="elevation-1" :loading="loading">
            <template v-slot:no-data>
                <v-alert :value="true">
                    Sorry, nothing to display here :( Why not add your own submission?
                </v-alert>
            </template>
            <template v-slot:items="props">
                <tr :style="{ cursor: 'pointer'}" >
                    <td class="text-xs-right"><v-icon v-if="props.item.author === (user||{}).username" @click="deleteSubmission(props.item.id)">close</v-icon>{{ props.item.author }}</td>
                    <td class="text-xs-right"><a :href="props.item.link">{{props.item.link}}</a></td>
                    <td class="text-xs-right">{{ props.item.description }}</td>
                    <td class="text-xs-right" v-if="user"><v-icon @click="upvote(props.item.id)">arrow_upward</v-icon><v-icon @click="downvote(props.item.id)">arrow_downward</v-icon></td>
                    <td class="text-xs-right">{{ props.item.upvoter_count }}</td>
                    <td class="text-xs-right">{{ props.item.downvoter_count }}</td>
                </tr>
            </template>
            <template v-slot:footer v-if="user">
                <td :colspan="headers.length">
                    <submission-dialog />
                </td>
            </template>
        </v-data-table>
        <div v-else>
            Loading popular videos...
        </div>
    </div>
</template>

<script>

import SubmissionDialog from '@/components/SubmissionDialog.vue'

export default {
    name: 'popular_videos',
    components: {
        SubmissionDialog,
    },
    data() {
        return {
        }
    },
    computed: {
        loading() {
            return this.$store.loadingSubmissions;
        },

        headers() {
            let headers = [
              { text: 'Poster', value: 'author' },
              { text: 'link', value: 'link'},
              { text: 'Description', value: 'description' },
              { text: 'Vote', value: '' },
              { text: 'Upvotes', value: 'upvoter_count' },
              { text: 'Downvotes', value: 'downvoter_count' }];

              if (!this.$store.state.user) {
                 headers.splice(3, 1);
              }
              return headers;
        },
        user() {
            return this.$store.state.user;
        },
        submissions() {
            return this.$store.state.submissions;
        }
    },
    async created() {
        await this.$store.dispatch("getSubmissions");
    },
    methods: {
        async upvote(id) {
            await this.$store.dispatch("upvoteSubmission", {id: id});
        },
        async downvote(id) {
            await this.$store.dispatch("downvoteSubmission", {id: id});
        },
        async deleteSubmission(id) {
            await this.$store.dispatch("deleteSubmission", {id: id});
        }
    }
}
</script>
