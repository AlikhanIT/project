const express = require("express");
const userController = require("../controlles/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
const router = express();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/refresh", adminMiddleware, userController.refresh);
router.delete("/:id", userController.remove);
router.put("/:id", userController.edit);
router.get("/:id", userController.get);
router.get("/", userController.getAll);

module.exports = router;
