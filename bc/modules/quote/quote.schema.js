const mongoose = require("mongoose");

const Quote = new mongoose.Schema(
  {
    event: {
      type: String,
      required: true,
    },
    serving: {
      type: String,
      required: true,
      min: 2,
    },
    form: {
      type: String,
      required: true,
    },
    cakeBase: {
      type: String,
      required: true,
    },
    cakeSoak: {
      type: String,
      required: true,
    },
    cakeCream: {
      type: String,
      required: true,
    },
    cakeTopping: {
      type: String,
      required: true,
      max: 1,
    },
    cakeLettering: {
      type: String,
      required: false,
    },
    cakeDecoration: {
      type: String,
      required: false,
    },
    allergies: {
      type: String,
      required: false,
    },
    otherNotes: {
      type: String,
      required: false,
    },
    exapleCake: {
      type: String,
      required: false,
    },
    deliveryData: {
      type: Date,
      required: true,
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "address",
      required: false,
    },
    
    priceQuoted: {
      type: Number,
      required: false,
      min: 0,
    },
    adminNotes: {
      type: String,
      required: false,
      trim: true,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "quoted",
        "confirmed",
        "rejected",
        "in_progress",
        "completed",
        "cancelled",
      ],
      default: "pending",
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    stripePaymentId: { type: String, required: false },
    paidAt: {
      type: Date,
      required: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true, strict: true },
);
module.exports = mongoose.model("quote", Quote, "quotes");
