<template>
<div>
  <div v-if="user">
    <div class="comment" v-for="comment in comments" v-bind:key="comment._id">
        <div>
            <p>author: {{comment.user.name}} ({{comment.user.username}})</p>
            <p>when: {{formatDate(comment.created)}}</p>
            <p>comment: {{comment.text}}</p>
        </div>
    </div>
    <form @submit.prevent="comment" class="pure-form pure-form-aligned">
      <fieldset>
        <div class="pure-control-group">
          <label for="commentText">Comment</label>
          <textarea v-model="commentText" cols="40" rows="5"></textarea>
        </div>

        <div class="pure-controls">
          <button type="submit" class="pure-button pure-button-primary">Add Comment</button>
        </div>
      </fieldset>
    </form>
    <p v-if="error" class="error">{{error}}</p>
  </div>
  <div v-else>
    <p>If you would like to see comments, please register for an account or login.</p>
    <router-link to="/register" class="pure-button">Register</router-link> or
    <router-link to="/login" class="pure-button">Login</router-link>
  </div>
</div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'ImageComments',
  data() {
    return {
        commentText: '',
        error: ''
    }
  },
  computed: {
    user() {
        return this.$store.state.user;
    },
    comments() {
        return this.$store.state.currentComments || [];
    }
  },
  methods: {
    formatDate(date) {
      if (moment(date).diff(Date.now(), 'days') < 15) {
        return moment(date).fromNow();
      } else {
        return moment(date).format('d MMMM YYYY');
      }
    },
    async comment() {
      try {
        this.error = await this.$store.dispatch("addComment", {
            commentText: this.commentText,
            photo: this.$store.state.singularPhoto[0],
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>


<style scoped>
form {
  border: 1px solid #ccc;
  background-color: #eee;
  border-radius: 4px;
  padding: 20px;
}

.pure-controls {
  display: flex;
}

.pure-controls button {
  margin-left: auto;
}

.comment {
    margin: 0 0 1.5em;
    padding: 20px;
    display: inline-block;
    width:100%;
    border: 1px solid #ccc;
    background-color: #eee;
    border-radius: 4px;
}
</style>
