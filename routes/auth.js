const router = require("express").Router();
const db = require("../db");
require("dotenv");

// Token Helper Functions
const makeToken = () => { // Make and store a new token and expiration 
    const tokenPart = Math.random().toString(36).substr(2);
    const token = tokenPart + tokenPart;
    const expires = Date.now() + 604800000;
    db.tokens.insertOne({ token: token, expires: expires }, (err, results) => {
      if (err) throw err;
    });
    return token;
  };

// Auth Routes
router.post("", (req, res) => {
    console.log('REQ.BODY', req.body)
    if (!req.body.password) {
      res.json({ success: false });
    } else if(process.env.PASSCODE === req.body.password) { 
      const token = makeToken();
      res.json({ success: true, token: token });
    } else {
      res.json({ success: false });
    }
  });

router.post("/validate", (req, res) => {
    if (!req.body.token) {
      res.json({ success: false });
    } else {
      db.tokens.findOne({ token: req.body.token }, (err, results) => {
        if (err) throw err;
        res.json({ success: (Date.now() < results.expires)})
      });
    }
  });

  module.exports = router;
  