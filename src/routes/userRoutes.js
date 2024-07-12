const express = require("express");
const router = express.Router();
const linkControllers = require("../controllers/linkController")

router.put("/api/update", linkControllers.updateLink);
router.delete("/api/delete", linkControllers.deleteLink);

module.exports = router;