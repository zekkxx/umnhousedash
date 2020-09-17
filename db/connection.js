const mongojs = require("mongojs");
const connection = process.env.MONGODB_URI || "mongodb://localhost/UMNHouseCupDB";
const db = mongojs(connection, ["houses", "users", "log", "challenge"]);

module.exports = db;