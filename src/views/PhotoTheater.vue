<template>
<div>
  <div v-if="user">
    <div class="header">
      <div>
        <h1>{{user.name}}</h1>
      </div>
      <div>
        <p>
          <a href="#" @click="logout"><i class="fas fa-sign-out-alt"></i></a>
        </p>
      </div>
    </div>
  </div>
  <div v-else>
    <p>If you would like to upload photos, please register for an account or login.</p>
    <router-link to="/register" class="pure-button">Register</router-link> or
    <router-link to="/login" class="pure-button">Login</router-link>
  </div>
  <singular-image-gallery />
  <image-comments />
</div>
</template>

<script>
import SingularImageGallery from '@/components/SingularImageGallery.vue'
import ImageComments from '@/components/ImageComments.vue'

export default {
  name: 'phototheater',
  components: {
    SingularImageGallery,
    ImageComments,
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  async created() {
    await this.$store.dispatch("getUser");
  },
  methods: {
    async logout() {
      try {
        this.error = await this.$store.dispatch("logout");
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

<style scoped>
.header {
  display: flex;
}

.header a {
  padding-left: 50px;
  color: #222;
  font-size: 2em;
}

.header svg {
  margin-top: 12px;
}
</style>
