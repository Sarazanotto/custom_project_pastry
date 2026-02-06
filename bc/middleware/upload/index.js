const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudCake = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "displayCakes",
    format: async (req, file) => "jpg",
    public_id: (req, file) => file.name,
  },
});
const cloudAvatar = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "avatar",
    format: async (req, file) => "jpg",
    public_id: (req, file) => file.name,
  },
});

const uploadCake = multer({ storage: cloudCake });
const uploadAvatar = multer({ storage: cloudAvatar });

module.exports = {
  uploadCake,
  uploadAvatar,
};
