const userModel = require("../models/userModel");
const tokenService = require("../services/tokenService");
const apiError = require("../errors/apiError");
const bcrypt = require("bcrypt");
const userDto = require("../dtos/userDto");

class UserService {
  register = async (
    email,
    name,
    password,
    gender,
    birthday,
    phoneNumber,
    role
  ) => {
    const condidat = await userModel.findOne({ email });
    if (condidat) {
      throw apiError.BadRequest("Такая почта уже существует");
    }

    const passwordHash = await bcrypt.hash(password, 3);

    const result = await userModel.create({
      email,
      name,
      password: passwordHash,
      gender,
      birthday,
      phoneNumber,
      role,
    });

    const user = new userDto(result);

    const { refreshToken, accessToken } = tokenService.generateTokens({
      ...user,
    });

    await tokenService.saveToken(result._id, refreshToken);

    return { ...user, refreshToken: refreshToken, accessToken: accessToken };
  };

  login = async (email, password) => {
    const condidat = await userModel.findOne({ email });
    if (!condidat) {
      throw apiError.BadRequest("Такой почты не существует");
    }
    const passwordHash = await bcrypt.compare(password, condidat.password);

    if (!passwordHash) {
      throw apiError.BadRequest("Пароль не верен");
    }

    const user = new userDto(condidat);

    const { refreshToken, accessToken } = tokenService.generateTokens({
      ...user,
    });

    await tokenService.saveToken(condidat._id, refreshToken);

    return { ...user, refreshToken: refreshToken, accessToken: accessToken };
  };

  logout = async (refreshToken) => {
    await tokenService.removeToken(refreshToken);

    return { status: "SUCCES" };
  };

  refresh = async (refreshToken) => {
    if (!refreshToken) {
      throw apiError.UnathorizedError();
    }
    console.log(refreshToken);
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    console.log(userData, tokenFromDb);
    if (!userData || !tokenFromDb) {
      throw apiError.UnathorizedError();
    }

    const user = await userModel.findById(userData.id);
    const result = new userDto(user);

    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    console.log({
      ...tokens,
      ...result,
    });

    return {
      ...tokens,
      ...result,
    };
  };

  remove = async (id) => {
    const result = await userModel.findByIdAndDelete(id);
    return result;
  };

  edit = async (id, email, name, password, gender, birthday, phoneNumber) => {
    const passwordHash = await bcrypt.hash(password, 3);

    const result = await userModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        email,
        name,
        password: passwordHash,
        gender,
        birthday,
        phoneNumber,
      },
      {
        returnDocument: "after",
      }
    );
    return result;
  };

  get = async (id) => {
    const result = await userModel.findById(id);
    return result;
  };
  getAll = async () => {
    const result = await userModel.find();
    return result;
  };
}

module.exports = new UserService();
