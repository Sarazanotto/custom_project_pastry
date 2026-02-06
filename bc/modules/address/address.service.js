const AddressSchema = require("./address.schema");

const createAddress = async (userId, body) => {
  const newAddress = new AddressSchema({
    ...body,
    user: userId,
  });
  return newAddress.save();
};

const updateAddress = async (userId, addressId, body) => {
  return AddressSchema.findOneAndUpdate(
    { _id: addressId, user: userId },
    body,
    { new: true },
  );
};

const deleteAddress = async (userId, addressId) => {
  return AddressSchema.findOneAndDelete({ _id: addressId, user: userId });
};

const getAddress = async (userId) => {
  return await AddressSchema.find({ user: userId });
};

const getForAdmin = async (addressId) => {
  return await AddressSchema.findById(addressId);
};

module.exports = {
  createAddress,
  updateAddress,
  deleteAddress,
  getAddress,
  getForAdmin,
};
