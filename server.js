const express = require("express");
const bodyParser = require("body-parser");
require('dotenv').config();
const PORT = process.env.PORT || 3001;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(require("./routes"));

app.listen(PORT, () => {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
