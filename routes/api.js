const router = require("express").Router();
const db = require("../db");

// Log Helper Functions
// Mongo log point change
const dbLog = (points, house) => {
    const logEntry = {
      points, house,
      ts: new Date().toString()
    };
    db.log.insertOne(logEntry, (err, results) => {
      if (err) throw err;
      return true;
    });
  };

// Token Helper Functions
const validateToken = (token) => {  
  if (!token) {
    return false;
  } else {
    db.tokens.findOne({ token: token }, (err, results) => {
      if (err) throw err; 
      return (Date.now() < results.expire)
    });
  }
};

// Routes
router.get("/points", (req, res) => {
  db.houses.find({}, (err, results) => {
    console.log('RESULTS: ', results)
    if (err) throw err;
    res.send(results).end();
  });
});

router.post("/points", (req, res) => {
    db.houses.find({ house: req.body.house }, (err, results) => {
      if (err) throw err;
      let currentPoints = parseInt(results[0].points);
      let currentWeekPoints = parseInt(results[0].weekpoints);
      let revisedPoints = currentPoints + parseInt(req.body.points);
      let revisedWeekPoints = currentWeekPoints + parseInt(req.body.points);
      console.log(validateToken(req.body.token));
      dbLog(parseInt(req.body.points), req.body.house);
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
