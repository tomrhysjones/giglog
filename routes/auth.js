const express = require("express");
const router = express.Router();

router.get("/login", (req, res) => {
  res.render("auth/login", { title: "GigLog - Login", header: "Login" });
});

// Your nav points here, so we serve a "signed out" page
router.get("/email", (req, res) => {
  res.render("auth/signout", { title: "GigLog - Signed Out", header: "Signed Out" });
});

module.exports = router;
