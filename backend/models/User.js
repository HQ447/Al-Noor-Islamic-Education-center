import mongoose from "mongoose";
import { type } from "os";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    role: { type: String, required: true },

    whatsapp: { type: String },
    country: { type: String },
    course: { type: String },
    designation: { type: String },
    qualification: { type: String },
    experience: { type: String },
    img: { type: String },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    teacherName: { type: String },
    //superAdmin: { type: Boolean, default: false },
    joinDate: { type: Date },
    password: { type: String },
    status: {
      type: String,
      enum: ["pending", "registered", "rejected"],
      default: "pending",
    },
    feeStatus: { type: String, enum: ["clear", "unclear"], default: "unclear" },
    feeEndDate: {
      type: Date,
    },
    otp: { type: Number },
    otpExpiry: { type: Date },
  },
  { timestamps: true }
);
export default mongoose.model("User", userSchema);
