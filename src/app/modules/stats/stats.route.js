const express = require("express");
const router = express.Router();

const { userStats } = require("./stats.controller");

// user stats

router.get("/user-stats/:email", userStats)  

module.exports = router;



