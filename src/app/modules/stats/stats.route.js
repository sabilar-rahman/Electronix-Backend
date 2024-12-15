const express = require("express");
const router = express.Router();

const { userStats ,adminStats } = require("./stats.controller");

// user stats

router.get("/user-stats/:email", userStats)


//admin stats 

router.get("/admin-stats", adminStats)

module.exports = router;



