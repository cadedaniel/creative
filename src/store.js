import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: localStorage.getItem('authuser') || null,
    leaderboard: null,
    twitchStreams: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;

      if (user === null) {
        localStorage.removeItem('authuser');
      } else {
        localStorage.setItem('authuser', user)
      }
    },

    setLeaderboard(state, leaderboard) {
        state.leaderboard = leaderboard;
    },

    setTwitchStreams(state, twitchStreams) {
        const sorted = [...twitchStreams].sort((first, second) => first.viewer_count < second.viewer_count)
        state.twitchStreams = sorted;
    }
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
    async getLeaderboard(context) {
      try {
        let response = await axios.get("/api/users/leaderboard");
        context.commit('setLeaderboard', response.data);
        return "";
      } catch (error) {
        return "";
      }
    },
    async getTwitchStreams(context) {
      try {
        const client = axios.create({
          baseURL: 'https://api.twitch.tv/helix/streams',
          timeout: 1000,
          headers: {'Client-ID': '5frojjbfio2gqpce21dzbecabm1tsg'}
        });
        let response = await client.get("/", {params: {game_id: '11989'}});
        context.commit('setTwitchStreams', response.data.data);
        return "";
      } catch (error) {
        return "";
      }
    },
  }
});
