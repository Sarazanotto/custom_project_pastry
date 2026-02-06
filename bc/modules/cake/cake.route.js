const express = require("express");
const cake = express.Router();
const cakeController = require("./cake.controller");
const {uploadCake} = require("../../middleware/upload/index.js");

cake.get("/cakes", cakeController.getCakes);
cake.post("/cakes", cakeController.create);
cake.post("/cakes/img", uploadCake.single("cakeImage"), cakeController.upload);
cake.patch("/cakes/:cakeId",cakeController.modify)
cake.delete("/cakes/:cakeId",cakeController.deleteOne)

module.exports = cake;
