import User from "../models/User.js";


export const updateStudentFee = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { days } = req.body;

    // validation
    if (!days || days <= 0) {
      return res.status(400).json({
        message: "Please provide valid number of days",
      });
    }

    const student = await User.findById(studentId);
 
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const today = new Date();
    const feeEndDate = new Date(today);
    feeEndDate.setDate(feeEndDate.getDate() + Number(days));

    student.feeEndDate = feeEndDate;
    student.feeDays=days;
    await student.save();

    res.json({
      message: "Fee updated successfully",
      studentId: student._id,
      daysAdded: days,
      feeEndDate: student.feeEndDate,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
