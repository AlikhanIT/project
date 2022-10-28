const userModel = require("../models/userModel");

class UserService {
  create = async (text, liked, user) => {
    const result = await userModel.create({
      text,
      liked,
      user,
    });
    console.log("service ended");
    return result;
  };

  remove = async (id) => {
    const result = await userModel.findByIdAndDelete(id);
    console.log("service ended");
    return result;
  };
}

module.exports = new UserService();
