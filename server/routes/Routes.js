const express = require("express");
const router = express.Router();

router.route("/login").get(async (req, res) => {
  try {
    res.send("yay");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
