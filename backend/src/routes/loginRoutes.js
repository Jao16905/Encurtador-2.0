const express = require("express");
const router = express.Router();
const loginControllers = require("../controllers/loginController");
const authController = require("../controllers/authController");

router.post("/register", express.json(),loginControllers.register);
router.post("/login", express.json() ,loginControllers.login);

module.exports = router;