const express = require("express");
const userController = require("../controlles/userController");
const router = express();

router.post("/", userController.register);
router.delete("/:id", userController.remove);

module.exports = router;
