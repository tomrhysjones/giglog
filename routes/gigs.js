const express = require("express");
const router = express.Router();
const Gig = require("../models/Gig");

// INDEX - list all gigs
router.get("/", async (req, res) => {
  const gigs = await Gig.find().sort({ date: -1 });
  res.render("gigs/index", { gigs, title: "GiigLog", header: "All Gigs" });
});

// NEW - show form
router.get("/new", (req, res) => {
  res.render("gigs/new", { title: "GigLog", header: "Add a Gig" });
});

// CREATE - create gig
router.post("/", async (req, res) => {
  await Gig.create({
    title: req.body.title,
    venue: req.body.venue,
    date: req.body.date,
  });
  res.redirect("/gigs");
});

// SHOW - show one gig
router.get("/:id", async (req, res) => {
  const gig = await Gig.findById(req.params.id);
  if (!gig) return res.status(404).send("Gig not found");
  res.render("gigs/show", {
    gig,
    title: `GiigLog - ${gig.title}`,
    header: gig.title,
  });
});

// EDIT - show edit form
router.get("/:id/edit", async (req, res) => {
  const gig = await Gig.findById(req.params.id);
  if (!gig) return res.status(404).send("Gig not found");
  res.render("gigs/edit", {
    gig,
    title: `GiigLog - Edit ${gig.title}`,
    header: `Edit: ${gig.title}`,
  });
});

// UPDATE - update gig
router.put("/:id", async (req, res) => {
  await Gig.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    venue: req.body.venue,
    date: req.body.date,
  });
  res.redirect(`/gigs/${req.params.id}`);
});

// DELETE - delete gig
router.delete("/:id", async (req, res) => {
  await Gig.findByIdAndDelete(req.params.id);
  res.redirect("/gigs");
});

module.exports = router;
