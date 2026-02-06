const AddressNotFound = require("../../exception/address/addressNotFound");
const UserNotFound = require("../../exception/user/userNotFound");

const addressService = require("./address.service");

const create = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { body } = req;

    const newAddress = await addressService.createAddress(userId, body);
    res.status(201).send({
      statuscode: 201,
      message: "Address created succesfully",
      newAddress,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { addressId } = req.params;
    const { body } = req;
    const update = await addressService.updateAddress(userId, addressId, body);
    res.status(200).send({
      statusCode: 200,
      message: "User updated succesfully",
      update,
    });
  } catch (error) {
    next(error);
  }
};

const deleteOne = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { addressId } = req.params;
    if (!addressId) {
      return res.status(400).send({
        statusCode: 400,
        message: "Invalid param provided",
      });
    }
    const deleteAddress = await addressService.deleteAddress(userId, addressId);
    res.status(200).send({
      statusCode: 200,
      message: "Address deleted successfully",
      deleteAddress,
    });
  } catch (error) {
    next(error);
  }
};

const getAddress = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const addresses = await addressService.getAddress(userId);
    res.status(200).send({
      statusCode: 200,
      addresses,
    });
  } catch (error) {
    next(error);
  }
};

const getAddressAdmin= async(req,res,next)=>{
    try {
       const {addressId} = req.params
       const address= await addressService.getForAdmin(addressId)
       if(!address){
        throw new AddressNotFound()
       }
       res.status(200).send({
        statusCode:200,
        address
       })
    } catch (error) {
        next(error)
    }
}

module.exports={
    create,
    update,
    deleteOne,
    getAddress,
    getAddressAdmin
}