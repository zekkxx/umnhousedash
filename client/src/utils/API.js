import axios from "axios";

export default {
  addPoint: function(house, user, points, token) {
    return axios.post("/api/add", { house: house, user: user, token: token, points: points });
  },
  subtractPoint: function(house, user, token) {
    return axios.post("/api/subtract", { house: house, user: user, token: token });
  },
  resetWeekPoints: function(house, user, token) {
    return axios.post("/api/reset", { house: house, user: user, token: token });
  },
  giveOwl: function(house, user, token) {
    return axios.post("/api/owl", { house: house, user: user, token: token });
  },
  getPoints: function() {
    return axios.get("/api/get");
  },
  authenticateUser: function(user, password) {
    return axios.post("/auth", { user: user, password: password });
  },
  validate: function(token, user) {
    return axios.post("/auth/validate", { token: token, user: user });
  }
};
