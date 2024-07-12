const express = require("express");
const router = express.Router();
const linkControllers = require("../controllers/linkController")

router.get("/:args", linkControllers.redirect);
router.post("/api/create", express.json(), linkControllers.createLink);

module.exports = router;