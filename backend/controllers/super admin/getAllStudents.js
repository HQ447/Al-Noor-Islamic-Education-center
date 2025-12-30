import User from "../../models/User.js";
import { getFeeStatus } from "../../utils/feeStatus.js";

const getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "student" });
    if (!students) return res.json({ message: "no students found" });
const result = students.map((student) => ({
      ...student.toObject(),
      feeStatus: getFeeStatus(student.feeEndDate),
    }));
    res.json({ message: "Students fetch successfully", result });
  } catch (error) {
    console.log("error in getting student", error);
  }
};

export default getAllStudents;
