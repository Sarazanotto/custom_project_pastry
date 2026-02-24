const UserSchema = require("./user.schema");
const AddressSchema = require("../address/address.schema");

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
    .skip((page - 1) * pageSize)
    .populate("address");

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

const getUserById = async (id) => {
  const user = await UserSchema.findById(id).populate("address");
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

const updateUserWithAddresses = async (id, body) => {
  const { address, ...otherData } = body;

  if (address && Array.isArray(address)) {
    await AddressSchema.deleteMany({ user: id });

    if (address.length > 0) {
      const newAddresses = await AddressSchema.insertMany(
        address.map((addr) => ({ ...addr, user: id })),
      );
      otherData.address = newAddresses.map((a) => a._id);
    } else {
      otherData.address = [];
    }
  }

  return UserSchema.findByIdAndUpdate(id, otherData, { new: true }).populate(
    "address",
  );
};

const deleteUser = async (id) => {
  return UserSchema.findByIdAndDelete(id);
};

module.exports = {
  getAllUsers,
  getUserById,
  getUserByEmailOrNumber,
  createUser,
  updateUserWithAddresses,
  deleteUser,
  createAdmin,
};
