import express from "express";
import getAdmins from "../controllers/getAdmin.js";
import { addCourse } from "../controllers/addCourse.js";
import getCourses from "../controllers/getCourses.js";
import updateStatus from "../controllers/updateStatus.js";
import deleteStudent from "../controllers/deleteStudent.js";
import deleteCourse from "../controllers/deleteCourse.js";
import upload from "../middlewares/upload.js";
import { tokenVerifier } from "../middlewares/tokenVerifier.js";
import findCourse from "../controllers/findCourse.js";
import { uploadCloud } from "../middlewares/cloudinaryUpload.js";
import {
  getAdminProfile,
  updateAdminProfile,
} from "../controllers/profileController.js";
import deleteAdmin from "../controllers/deleteAdmin.js";
import getMyStudents from "../controllers/getMyStudents.js";
import { getStudent } from "../controllers/getStudent.js";
import { updateStudentFee } from "../controllers/updateStudentFee.js";

const router = express.Router();

router.get("/getAdmins", getAdmins);
router.post(
  "/create-course",

  upload.single("thumbnail"),
  addCourse
);
router.get("/courses", getCourses);
router.get("/course/:id", findCourse);
router.put("/updateStatus/:id/:teacherId", tokenVerifier, updateStatus);
router.delete("/deleteStudent/:id", tokenVerifier, deleteStudent);
router.delete("/deleteAdmin/:id", tokenVerifier, deleteAdmin);
router.delete("/deleteCourse/:id", deleteCourse);
router.get("/students", tokenVerifier, getMyStudents);
router.get("/student/:id", tokenVerifier, getStudent);
router.get("/getAdminProfile", tokenVerifier, getAdminProfile);
router.put("/updateStudentFee/:studentId", updateStudentFee);
router.put(
  "/updateProfile",
  tokenVerifier,
  uploadCloud.single("img"),
  updateAdminProfile
);

export default router;
