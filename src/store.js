import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    photos: [],
    singularPhoto: [],
    currentComments: [],
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setPhotos(state, photos) {
        state.photos = photos;
    },
    setSingularPhoto(state, photo) {
        state.singularPhoto = photo;
    },
    setCurrentComments(state, comments) {
        state.currentComments = comments;
        // TODO sort
    },
  },
  actions: {
    async register(context, data) {
      try {
        let response = await axios.post("/api/users", data);
        context.commit('setUser', response.data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async login(context, data) {
      try {
        let response = await axios.post("/api/users/login", data);
        context.commit('setUser', response.data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async logout(context) {
      try {
        await axios.delete("/api/users");
        context.commit('setUser', null);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async getUser(context) {
      try {
        let response = await axios.get("/api/users");
        context.commit('setUser', response.data);
        return "";
      } catch (error) {
        return "";
      }
    },
    async upload(context, data) {
        try {
            await axios.post('/api/photos', data);
            return "";
        } catch (error) {
            return error.response.data.message;
        }
    },
    async getMyPhotos(context) {
        try {
            let response = await axios.get("/api/photos");
            context.commit('setPhotos', response.data);
            return "";
        } catch (error) {
            return "";
        }
    },
    async getAllPhotos(context) {
        try {
            let response = await axios.get("/api/photos/all");
            context.commit('setPhotos', response.data);
            return "";
        } catch (error) {
            return "";
        }
    },
    async getSinglePhoto(context, { id }) {
        try {
            const response = await axios.get("/api/photos/" + id);
            context.commit('setSingularPhoto', [response.data]);
            return "";
        } catch (error) {
            return "";
        }
    },
    async addComment(context, data) {
        try {
            await axios.post("/api/comments/", data);
            this.dispatch('getComments', { id: this.state.singularPhoto[0]._id });
            return "";
        } catch (error) {
            return "";
        }
    },

    async getComments(context, data) {
        try {
            const response = await axios.get("/api/comments/" + data.id);
            context.commit('setCurrentComments', response.data);
            return "";
        } catch (error) {
            return "";
        }
    },
  }
});
