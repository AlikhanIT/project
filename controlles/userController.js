const userService = require("../services/userService");

class UserController {
  register = async (req, res, next) => {
    try {
      const { email, name, password, gender, birthday, phoneNumber, role } =
        req.body;
      const result = await userService.register(
        email,
        name,
        password,
        gender,
        birthday,
        phoneNumber,
        role
      );

      res.cookie("refreshToken", result.refreshToken, {
        maxAge: 14 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  };

  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const result = await userService.login(email, password);

      res.cookie("refreshToken", result.refreshToken, {
        maxAge: 14 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  };

  logout = async (req, res, next) => {
    try {
      const { refreshToken } = req.cookies;
      const result = await userService.logout(refreshToken);
      res.clearCookie("refreshToken");
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  };

  refresh = async (req, res, next) => {
    try {
      const { refreshToken } = req.cookies;
      console.log(refreshToken);
      const result = await userService.refresh(refreshToken.split(" ")[0]);

      res.cookie("refreshToken", result.refreshToken, {
        maxAge: 14 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.json(result);
    } catch (err) {
      next(err);
    }
  };

  remove = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await userService.remove(id);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  };

  edit = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { email, name, password, gender, birthday, phoneNumber } = req.body;
      const result = await userService.edit(
        id,
        email,
        name,
        password,
        gender,
        birthday,
        phoneNumber
      );
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  };

  get = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await userService.get(id);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  };

  getAll = async (req, res, next) => {
    try {
      const result = await userService.getAll();
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  };
}

module.exports = new UserController();
