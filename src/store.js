import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: localStorage.getItem('authuser') || null,
    leaderboard: null,
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
  }
});
