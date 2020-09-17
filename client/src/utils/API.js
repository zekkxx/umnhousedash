import axios from "axios";

export default {
  getPoints: function() {
    return axios.get("/api/points");
  },
  addPoint: function(house, points, token) {
    return axios.post("/api/points", { house: house, token: token, points: points });
  },
  resetWeekPoints: function(house, token) {
    return axios.post("/api/reset", { house: house, token: token });
  },
  giveOwl: function(house, token) {
    return axios.post("/api/owl", { house: house, token: token });
  },
  authenticateUser: function(password) {
    return axios.post("/auth", { password: password });
  },
  validate: function(token) {
    return axios.post("/auth/validate", { token: token });
  }
};
