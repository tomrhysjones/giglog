const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const layouts = require("express-ejs-layouts");
require("dotenv").config();

const app = express();

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

// view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(layouts);

// DB
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.once("open", () => {
  console.log("✅ Connected to MongoDB");
});

// routes
const gigsRouter = require("./routes/gigs");
const authRouter = require("./routes/auth");

app.use("/gigs", gigsRouter);
app.use("/auth", authRouter);

// root -> redirect to gigs
app.get("/", (req, res) => {
  res.redirect("/gigs");
});

app.listen(3000, () => {
  console.log("✅ Server running on http://localhost:3000");
});
