const express = require("express");
const router = express.Router();

// Login page
router.get("/login", (req, res) => {
  res.render("auth/login", {
    title: "GiigLog – Login",
    header: "Login"
  });
});

// Sign out (DESTROY SESSION SAFELY)
router.get("/signout", (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        return res.redirect("/gigs");
      }
      res.clearCookie("connect.sid");
      res.redirect("/login");
    });
  } else {
    res.redirect("/login");
  }
});

module.exports = router;
