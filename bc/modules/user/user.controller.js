const UserNotFound = require("../../exception/user/userNotFound");
const userService = require("./user.service");

const createUser = async (req, res, next) => {
  const { body } = req;
  try {
    const existingUser = await userService.getUserByEmailOrNumber(
      body.email || body.phone,
    );
    if (existingUser) {
      let message = "";
      if (existingUser.email === body.email) {
        return (message = "Email already exists");
      } else if (existingUser.phone === body.phone) {
        return (message = "Phone already exists");
      } else message = "User already exixts";

      return res.status(400).send({
        statusCode: 400,
        message,
      });
    }
    const newUser = await userService.createUser(body);
    res.status(201).send({
      statusCode: 201,
      message: "User created successfully",
      newUser,
    });
  } catch (error) {
    next(error);
  }
};

const upload = async (req, res, next) => {
  try {
    const img = req.file.path;
    res.status(200).json({
      avatar: img,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { body } = req;
    const { id } = req.params;
    if (!id) {
      throw new UserNotFound();
    }
    const user = await userService.updateUser(id, body);

    res.status(200).send({
      statusCode: 200,
      message: "Successfully modifies user",
      user,
    });
  } catch (error) {
    next(error);
  }
};

const deleteOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new UserNotFound();
    }
    const user = await userService.deleteUser(id);

    res.status(200).send({
      statusCode: 200,
      message: "User deleted successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const { page = 1, pageSize = 20 } = req.query;
    const { totalUsers, totalPages, users } = await userService.getAllUsers(
      page,
      pageSize,
    );

    if (users.length === 0) {
      throw new UserNotFound();
    }

    res.status(200).send({
      statusCode: 200,
      page: Number(page),
      pageSize: Number(pageSize),
      totalPages: Number(totalPages),
      totalUsers: Number(totalUsers),
      users,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  createUser,
  upload,
  update,
  deleteOne,
  getAllUsers,
};
