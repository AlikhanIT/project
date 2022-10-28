const assigmentService = require("../services/assigmentService");

class UserController {
  create = async (req, res) => {
    try {
      const { text, liked, user } = req.body;
      const result = await assigmentService.create(text, liked, user);
      res.status(201).json(result);
    } catch (e) {
      console.log(e);
    }
  };

  remove = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await assigmentService.remove(id);
      res.status(201).json(result);
    } catch (e) {
      console.log(e);
    }
  };
}

module.exports = new UserController();
