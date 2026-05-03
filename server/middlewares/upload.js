const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "courtdiary_cases",
    allowed_formats: ["jpg", "png", "jpeg", "pdf"],
  },
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    const validMimes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"];
    if (validMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF, JPG, PNG, JPEG are allowed"), false);
    }
  }
});

module.exports = { upload, cloudinary };
