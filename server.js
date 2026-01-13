const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const session = require("express-session");
const layouts = require("express-ejs-layouts");
require("dotenv").config();

const app = express();

// ===== Middleware =====
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "dev-secret",
    resave: false,
    saveUninitialized: false
  })
);

app.use((req, res, next) => {
  res.locals.currentUser = req.session?.user || null;
  next();
});


// ===== View Engine =====
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(layouts);

// ===== Routes =====
const gigsRouter = require("./routes/gigs");
const authRouter = require("./routes/auth");

app.use("/gigs", gigsRouter);
app.use("/", authRouter);

// Root → gigs
app.get("/", (req, res) => {
  res.redirect("/gigs");
});

app.get("/signout", (req, res) => {
  if (!req.session) return res.redirect("/login");

  req.session.destroy((err) => {
    if (err) return res.redirect("/gigs");
    res.clearCookie("connect.sid");
    res.redirect("/login");
  });
});


// ===== Database =====
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.once("open", () => {
  console.log("✅ Connected to MongoDB");
});

// ===== Server =====
app.listen(process.env.PORT, () => {
  console.log("✅ Server running on http://localhost:3000");
});
