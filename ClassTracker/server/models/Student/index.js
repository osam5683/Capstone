import mongoose from "mongoose";

let studentSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 25,
    minlength: 2,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
});

export default mongoose.model("Student", studentSchema, "Student");
