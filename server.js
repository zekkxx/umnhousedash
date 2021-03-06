const express = require("express");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3001;
require('dotenv').config();
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
