const express = require("express");
const router = express.Router();
const path = require("node:path");

// API
const axios = require("axios");

// Add your routes here - above the module.exports line

router.post("/manage-API-key-start", function (req, res) {
  res.redirect("create-new-API-key");
});

router.post("/manage-API-key", function (req, res) {
  res.redirect("create-new-API-key");
});

router.post("/create-new-API-key", function (req, res) {
  res.redirect("new-API-key-details");
});
module.exports = router;
