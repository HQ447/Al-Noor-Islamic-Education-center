import User from "../models/User.js";
import { getFeeStatus } from "../utils/feeStatus.js";


export const getStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await User.findById(id).select("-password");
    if (
      !student
    ) {
      return res.status(404).json({ message: "student not found" });
    }
    res.status(200).json({...student.toObject(),
    feeStatus: getFeeStatus(student.feeEndDate),});
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
