// const express = require("express");

import express from "express";
const router = express.Router();


router.post("/register", (req, res) => {
    console.log(req.body);
    res.send("Register");
});

export const UserRoutes = router;