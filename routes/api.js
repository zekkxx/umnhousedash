const router = require("express").Router();
const db = require("../db");

// Log Helper Functions
// Mongo log point change
const dbLog = (points, house) => {
    const logEntry = {
      points: points,
      house: house,
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
router.get("/get", (req, res) => {
  db.houses.find({}, (err, results) => {
    console.log('RESULTS: ', results)
    if (err) throw err;
    res.send(results).end();
  });
});

router.post("/add", (req, res) => {
    db.houses.find({ house: req.body.house }, (err, results) => {
      if (err) throw err;
      let currentPoints = parseInt(results[0].points);
      let currentWeekPoints = parseInt(results[0].weekpoints);
      let revisedPoints = currentPoints + parseInt(req.body.points);
      let revisedWeekPoints = currentWeekPoints + parseInt(req.body.points);
      console.log(validateToken(req.body.user, req.body.token));
      dbLog(parseInt(req.body.points), req.body.house);
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
      dbLog(-1, req.body.house);
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

module.exports = router;
