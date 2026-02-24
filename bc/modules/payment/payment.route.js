const express = require("express");
const router = express.Router();
const { createIntent, webhook } = require("./payment.controller");

router.post("/webhook", express.raw({ type: "application/json" }), webhook);


router.post("/create-intent", createIntent);

module.exports = router;