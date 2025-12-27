import User from "../models/User.js";
import { getFeeStatus } from "../utils/feeStatus.js";

const getMyStudents = async (req, res) => {
  const id = req.user.id;
  try {
    const students = await User.find({ role: "student", teacherId: id });
    if (!students) return res.json({ message: "no students found" });

    const result = students.map((student) => ({
      ...student.toObject(),
      feeStatus: getFeeStatus(student.feeEndDate),
    }));
    res.json({ message: "Studennts fetch successfully", result });
  } catch (error) {
    console.log("error in getting student", error);
  }
};

export default getMyStudents;
