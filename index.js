const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./router/index");
const errorsMiddleware = require("./middlewares/errorMiddleware");
const app = express();
require("dotenv").config();

app.use(express.json());
app.set("view engine", "ejs");
app.use(cors());
app.use(cookieParser());
app.use(errorsMiddleware);
app.use("/api", router);

const port = process.env.PORT || 5000;

app.post("/", (req, res) => {
  console.log(req);
  res.send(req.body);
});

app.get("/test", (req, res) => {
  res.render("room", { roomId: "testing" });
});

const start = async () => {
  try {
    mongoose.connect(process.env.DB_URL, () => {
      console.log("Mongo connected");
    });
    await app.listen(port, () => {
      console.log("Server started on", port);
    });
  } catch (e) {
    console.warn(e);
  }
};

start();
