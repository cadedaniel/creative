<template>
    <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on }">
                <v-btn color="primary" dark v-on="on">Submit a link</v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <span class="headline">Link Submission</span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12 sm6 md4>
                                <v-text-field label="Link to video" v-model="link" required></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field label="Description" v-model="description" required></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="cancel()">Cancel</v-btn>
                    <v-btn color="blue darken-1" flat @click="submit()">Submit</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
export default {
    data: () => ({
        dialog: false,
        link: '',
        description: '',
        error: '',
    }),

    methods: {
        async submit() {

            this.error = await this.$store.dispatch("submitLink", {
                link: this.link,
                description: this.description
            });
            this.link = ''
            this.description = ''
            this.dialog = false;
        },
        cancel() {
            this.link = ''
            this.description = ''
            this.dialog = false;
        }
    }
}
</script>
