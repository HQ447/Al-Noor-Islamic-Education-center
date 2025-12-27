import User from "../models/User.js";

export const updateStudentFee = async (req, res) => {
  try {
    const { studentId } = req.params;

    const student = await User.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const today = new Date();
    const feeEndDate = new Date(today);
    feeEndDate.setDate(feeEndDate.getDate() + 30);

    student.feeEndDate = feeEndDate;
    await student.save();

    res.json({
      message: "Fee updated successfully",
      feeEndDate,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
