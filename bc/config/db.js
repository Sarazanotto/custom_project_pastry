const mongoose = require("mongoose");
require("dotenv").config();
const { createAdmin } = require("../modules/user/user.service");
const initConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Database connected succesfully");
  } catch (error) {
    console.error("Database connection", error);
    process.exit(1);
  }
};

const startServer = async (port, server) => {
  await initConnection();
  await createAdmin();
  server.listen(port, () => {
    console.log(`Server up and running on port ${port}`);
  });
};

module.exports = startServer;
