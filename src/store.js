import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: localStorage.getItem('authuser') || null,
    leaderboard: null,
    twitchStreams: null,
    submissions: null,
    loadingSubmissions: true
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
    },
    setSubmissions(state, submissions) {
        state.submissions = submissions;
        state.loadingSubmissions = false
    },
    setLoadingSubmissions(state, value) {
        state.loadingSubmissions = value;
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
    async submitLink(context, data) {
      try {
        await axios.post("/api/submissions", data);
        this.dispatch("getSubmissions");
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async getSubmissions(context) {
      try {
        context.commit('setLoadingSubmissions', true);
        const response = await axios.get("/api/submissions");
        context.commit('setSubmissions', response.data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async upvoteSubmission(context, data) {
      try {
        await axios.post("/api/submissions/" + data.id + '/upvoters');
        this.dispatch("getSubmissions");
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async downvoteSubmission(context, data) {
      try {
        await axios.post("/api/submissions/" + data.id + '/downvoters');
        this.dispatch("getSubmissions");
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async deleteSubmission(context, data) {
      try {
        await axios.delete("/api/submissions/" + data.id);
        this.dispatch("getSubmissions");
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
  }
});
