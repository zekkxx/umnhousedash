const router = require("express").Router();
const db = require("../db");

// Token Helper Functions
const makeToken = user => { // Make and store a new token and expiration 
    const tokenPart = Math.random().toString(36).substr(2);
    const token = tokenPart + tokenPart;
    const expires = Date.now() + 604800000;
    db.users.update({ user: user }, { $push: { tokens: { token: token, expires: expires } } }, (err, results) => {
      if (err) throw err;
    });
    return token;
  };

// Auth Routes
router.post("", (req, res) => {
    console.log('REQ.BODY', req.body)
    if (!req.body.user || !req.body.password) {
      res.json({ success: false });
    } else {
      db.users.find({ user: req.body.user }, (err, results) => {
        if (err) throw err;
        if (!results[0]) {
          res.json({ success: false });
        } else {
          console.log(results);
          if(results[0].password === req.body.password) { 
              const token = makeToken(req.body.user);
              res.json({ success: true, token: token, user: req.body.user });
          } else {
            res.json({ success: false });
          }
        }
      });
    }
  });

router.post("/validate", (req, res) => {
    let userExpire;
    let tokenFound = false;
  
    if (!req.body.token || !req.body.user) {
      res.json({ success: false });
    } else {
      db.users.find({ user: req.body.user }, (err, results) => {
        if (err) throw err;
        results[0].tokens.forEach(e => {
          if (e.token === req.body.token) {
            tokenFound = true;
            userExpire = e.expires;
          }
        });
        res.json({ success: (tokenFound && Date.now() < userExpire)})
      });
    }
  });

  module.exports = router;
  