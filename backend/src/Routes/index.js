const express = require("express");
const router = express.Router();
const users = require("./users");
const auth = require("./auth");

// read all
router.get("/", (req, res) => {
  res.json({
    message: "API",
  });
});

router.use("/auth", auth);
router.use("/users", users);
module.exports = router;
