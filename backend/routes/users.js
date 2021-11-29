const express = require("express");

const router = express.Router();

const checkToken = require("../middlewares/auth");
const { signup, loginUser } = require("../controllers/userController");

router.post("/registration", signup);
router.post("/login", loginUser);
router.get("/getusers", checkToken, (req, res) => {
  res.send("you are authenticated");
});

module.exports = router;
