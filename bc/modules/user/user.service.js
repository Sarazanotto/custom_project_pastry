const UserSchema = require("./user.schema");

const createAdmin = async () => {
  const admin = await UserSchema.findOne({ role: "admin" });
  if (admin) return;
  await UserSchema.create({
    firstName: "sara",
    lastName: "zanotto",
    userName: "admin",
    email: "admin@gmail.com",
    phone: "333449987",
    password: "passwordAdmin",
    role: "admin",
  });
};

const getAllUsers = async (page, pageSize) => {
  const users = await UserSchema.find()
    .limit(pageSize)
    .skip((page - 1) * pageSize);

  const totalUsers = await UserSchema.countDocuments();
  const totalPages = Math.ceil(totalUsers / pageSize);
  return {
    page,
    pageSize,
    totalUsers,
    totalPages,
    users,
  };
};

const geUsertById = async (id) => {
  const user = await UserSchema.findById(id);
  return user;
};

const getUserByEmailOrNumber = async (identifier) => {
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
  const query = isEmail ? { email: identifier } : { phone: identifier };
  const user = await UserSchema.findOne(query);
  return user;
};

const createUser = async (body) => {
  const newUser = new UserSchema(body);
  return await newUser.save();
};

const updateUser = async (id, body) => {
  return UserSchema.findByIdAndUpdate(id, body, { new: true });
};

const deleteUser = async (id) => {
  return UserSchema.findByIdAndDelete(id);
};

module.exports = {
  getAllUsers,
  geUsertById,
  getUserByEmailOrNumber,
  createUser,
  updateUser,
  deleteUser,
  createAdmin,
};
