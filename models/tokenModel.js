const { Schema, model } = require("mongoose");

const TokenModel = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  refreshToken: {
    type: String,
    required: true,
  },
});

module.exports = model("Token", TokenModel);
