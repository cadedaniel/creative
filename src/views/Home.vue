<template>
<div class="home" v-if="user">
  <image-gallery :photos="photos" />
</div>
<div v-else>
  <p>If you would like to view photos, please register for an account or login.</p>
  <router-link to="/register" class="pure-button">Register</router-link> or
  <router-link to="/login" class="pure-button">Login</router-link>
</div>
</template>

<script>
// @ is an alias to /src
import ImageGallery from '@/components/ImageGallery.vue'

export default {
  name: 'home',
  components: {
    ImageGallery
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    photos() {
      return this.$store.state.photos;
    }
  },
  async created() {
    await this.$store.dispatch("getUser");
    await this.$store.dispatch("getAllPhotos");
  },
}
</script>
