<template>
<div>
  <div v-if="photos !== undefined && photos.length == 1">
    <div v-for="photo in photos" v-bind:key="photo._id" class="image">
      <img :src="photo.path" />
      <p class="photoTitle">{{photo.title}}</p>
      <p class="photoDate">
        <span v-if="photo.user.name">{{photo.user.name}}, </span>
          {{formatDate(photo.created)}}
      </p>
      <p>{{photo.description}}</p>
    </div>
  </div>
</div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'SingularImageGallery',
  props: {},
  methods: {
    formatDate(date) {
      if (moment(date).diff(Date.now(), 'days') < 15)
        return moment(date).fromNow();
      else
        return moment(date).format('d MMMM YYYY');
    }
  },

  computed: {
    photos() {
        return this.$store.state.singularPhoto;
    }
  },
  async created() {
    await this.$store.dispatch("getSinglePhoto", {
        id: this.$route.params.id,
    });
    await this.$store.dispatch('getComments', {
        id: this.$route.params.id,
    });
  },
}
</script>

<style scoped>
.photoTitle {
margin: 0px;
        font-size: 1.2em;
}

.photoDate {
margin: 0px;
        font-size: 0.9em;
        font-weight: normal;
}

p {
margin: 0px;
}

.image {
margin: 0 0 1.5em;
display: inline-block;
width: 100%;
}

.image img {
    max-width: 600px;
    max-height: 600px;
    image-orientation: from-image;
}
</style>
