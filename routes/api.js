const router = require("express").Router();
const db = require("../db");
const ObjectId = require("mongodb").ObjectID;
// const bcrypt = require('bcrypt');

// Log Helper Functions
// Mongo log point change
const dbLog = (user, points, house) => {
    const logEntry = {
      user: user,
      points: points,
      house: house,
      ts: new Date().toString()
    };
    db.log.save(logEntry, (err, results) => {
      if (err) throw err;
      return true;
    });
  };
  
  // Mongo log new challenge
  const dbChallengeLog = (user, challenge) => {
    const logEntry = {
      user: user,
      challenge: challenge,
      ts: new Date().toString()
    };
    db.log.save(logEntry, (err, results) => {
      if (err) throw err;
      return true;
    });
  };

// Token Helper Functions
const validateToken = (user, token) => {
    console.log("validateToken: Token: ", token);
    console.log("validateToken: User: ", user);
  
    let userExpire;
    let tokenFound = false;
  
    if (!token || !user) {
      console.log("validateToken: No token or no user. FAIL");
      return false;
    } else {
      db.users.find({ user: user }, (err, results) => {
        if (err) throw err;
  
        results[0].tokens.forEach(e => {
          if (e.token === token) {
            tokenFound = true;
            userExpire = e.expires;
          }
        });
  
        if (tokenFound) {
          const currentTS = Date.now();
          if (currentTS > userExpire) {
            console.log("validateToken: Today's timestamp is greater than the expiration timestamp. FAIL");
            return false;
          } else if (currentTS < userExpire) {
            console.log("validateToken: Today's timestamp is less than the expiration timestamp. PASS");
            return true;
          }
        } else if (tokenFound === false) {
          console.log("validateToken: No token found. FAIL");
          return false;
        } else {
          console.log("validateToken: None of the conditionals passed. FAIL");
          return false;
        }
      });
    }
  };

// Routes
router.post("/add", (req, res) => {
    db.houses.find({ house: req.body.house }, (err, results) => {
      if (err) throw err;
      let currentPoints = parseInt(results[0].points);
      let currentWeekPoints = parseInt(results[0].weekpoints);
      let revisedPoints = currentPoints + parseInt(req.body.points);
      let revisedWeekPoints = currentWeekPoints + parseInt(req.body.points);
      console.log(validateToken(req.body.user, req.body.token));
      dbLog(req.body.user, parseInt(req.body.points), req.body.house);
      db.houses.update({ house: req.body.house }, { $set: { points: revisedPoints, weekpoints: revisedWeekPoints } }, () => {
        res.status(200).end();
      });
    });
  });
  
  router.post("/subtract", (req, res) => {
    db.houses.find({ house: req.body.house }, (err, results) => {
      if (err) throw err;
      let currentPoints = parseInt(results[0].points);
      let currentWeekPoints = parseInt(results[0].weekpoints);
      let revisedPoints = currentPoints - 1;
      let revisedWeekPoints = currentWeekPoints - 1;
      console.log(validateToken(req.body.user, req.body.token));
      dbLog(req.body.user, -1, req.body.house);
      db.houses.update({ house: req.body.house }, { $set: { points: revisedPoints, weekpoints: revisedWeekPoints } }, () => {
        res.status(200).end();
      });
    });
  });
  
  router.post("/reset", (req, res) => {
    db.houses.update({ house: req.body.house }, { $set: { weekpoints: 0 } }, (err) => {
      if(err) throw err;
      res.status(200).end();
    });
  });
  
  router.post("/owl", (req, res) => {
    db.houses.update({}, { $set: { owl: false } }, { multi: true }, (err) => {
      if(err) throw err;
      db.houses.update({ house: req.body.house }, { $set: { owl: true } }, (err) => {
        if(err) throw err;
        res.status(200).end();
      });
    });
  });
  
  router.get("/get", (req, res) => {
    db.houses.find({}, (err, results) => {
      console.log('RESULTS: ', results)
      if (err) throw err;
      res.send(results).end();
    });
  });
  
  router.post("/challenge", (req, res) => {
    dbChallengeLog(req.body.user, req.body.challenge);
    db.challenge.update({ "_id": ObjectId("5b7cf1d6b48b0921af336561") }, { $set: { challenge: req.body.challenge } }, () => {
      res.status(200).end();
    });
  });
  
  router.get("/getchallenges", (req, res) => {
    db.challenge.find({ "_id": ObjectId("5b7cf1d6b48b0921af336561") }, (err, results) => {
      if (err) throw err;
      res.json({ challenge: results[0].challenge });
    });
  });

  // HASHING ROUTE
    // Uncomment this to make the hash function available for making new users
    // app.post("/api/hash", (req, res) => {
    //   bcrypt.hash(req.body.password, 10, function(err, hash) {
    //     res.json({ hash: hash });
    //   });
    // });

module.exports = router;
