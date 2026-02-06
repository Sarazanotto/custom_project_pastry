const mongoose = require("mongoose");

const Cake = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    ingredients: {
      type: [String],
      required: true,
      default:[]
    },
    cakeServings: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { timestamps: true, strict: true },
);
module.exports = mongoose.model("cake", Cake, "cakes");
