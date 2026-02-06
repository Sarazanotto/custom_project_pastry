const express = require("express");
const address = express.Router();
const addressController= require('./address.controller')
const adminAuth= require('../../middleware/auth/adminAuth')

address.post("/address",addressController.create)
address.patch("/address/:addressId",addressController.update)
address.delete("/address/:addressId",addressController.deleteOne)
address.get("/address/:userId",addressController.getAddress)
address.get("/address/admin/:userId", adminAuth ,addressController.getAddressAdmin)

module.exports= address