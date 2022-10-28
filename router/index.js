const express = require("express");
const userController = require("../controlles/userController");
const userRouter = require("./userRouter");
const assigmentRouter = require("./assigmentRouter");
const router = express();

router.use("/user", userRouter);
router.use("/assigment", assigmentRouter);

router.post("/", userController.register);
router.delete("/:id", userController.remove);

module.exports = router;
