import axios from "axios";

export default {
  getPoints: function() {
    return axios.get("/api/points");
  },
  addPoint: function(house, user, points, token) {
    return axios.post("/api/points", { house: house, user: user, token: token, points: points });
  },
  resetWeekPoints: function(house, user, token) {
    return axios.post("/api/reset", { house: house, user: user, token: token });
  },
  giveOwl: function(house, user, token) {
    return axios.post("/api/owl", { house: house, user: user, token: token });
  },
  authenticateUser: function(user, password) {
    return axios.post("/auth", { user: user, password: password });
  },
  validate: function(token, user) {
    return axios.post("/auth/validate", { token: token, user: user });
  }
};
