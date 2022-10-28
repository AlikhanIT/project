const { Schema, model } = require("mongoose");

const assigmentModel = new Schema({
  id: {
    type: String,
    required: true,
  },
  services: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  source: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  address: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

module.exports = model("assigment", assigmentModel);
