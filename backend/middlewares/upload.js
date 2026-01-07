import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "course_thumbnails",
    allowed_formats: ["jpg", "jpeg", "png", "webp", "gif", "svg"],
  },
});

const upload = multer({ storage: storage });

export default upload;
