const express = require("express");
const user = express.Router();
const userController = require("./user.controller");
const { uploadAvatar } = require("../../middleware/upload/index");
const authAdmin = require("../../middleware/auth/adminAuth");

user.post("/user", userController.createUser);
user.post("/user/avatar", uploadAvatar.single("avatar"), userController.upload);
user.patch("/user/:id", userController.update);
user.delete("/user/:id", userController.deleteOne);
user.get("/users", authAdmin, userController.getAllUsers);

module.exports = user;
