const express = require("express");
const router = express.Router();
const linkControllers = require("../controllers/linkController");
const auth = require("../controllers/authController")

router.put("/update", auth, linkControllers.updateLink);
router.delete("/delete", auth, linkControllers.deleteLink);

module.exports = router;