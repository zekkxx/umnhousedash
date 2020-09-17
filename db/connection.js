const mongojs = require("mongojs");
const connection = process.env.MONGODB_URI || "mongodb://localhost/UMNHouseCupDB";
const db = mongojs(connection, ["houses", "users", "log"]);

db.on("error", error => {
    console.log("Database Error: ", error);
  });

module.exports = db;