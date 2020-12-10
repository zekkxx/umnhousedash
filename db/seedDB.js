const db = require("../db");
require('dotenv').config();

// "houses" stores the houses available, their names, images, points, and owl status
// "users" stores any users that can login
// "log" stores any individual point changes -- LOG IS NOT SEEDED

// HOUSES
const houses = [{
    "house" : "GitHufflePuff",
    "points" : 0,
    "weekpoints" : 0,
    "owl" : false,
    "image" : "gh.png",
    "owlimage" : "gh_owl.png"
}, {
    "house" : "RavenClosure",
    "points" : 0,
    "weekpoints" : 0,
    "owl" : false,
    "image" : "rc.png",
    "owlimage" : "rc_owl.png"
}, {
    "house" : "SlytherIndent",
    "points" : 0,
    "weekpoints" : 0,
    "owl" : false,
    "image" : "siyc.png",
    "owlimage" : "siyc_owl.png"
}, {
    "house" : "GryffinDOM",
    "points" : 0,
    "weekpoints" : 0,
    "owl" : false,
    "image" : "gd.png",
    "owlimage" : "gd_owl.png"
}];

db.houses.runCommand('drop', (err, res) => {
    if (err) throw err;
    console.log("House collection dropped");
});

const bulk = db.houses.initializeOrderedBulkOp();
houses.forEach(house => {
    bulk.insert(house);
    console.log(`House ${house.house} prepared`);
});

bulk.execute((err, res) => {
    if (err) throw err;
    console.log("House collection populated")
    process.exit();
})