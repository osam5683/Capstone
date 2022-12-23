import Student from "../models/Student/index.js";
import bcrypt from "bcrypt";
import "../dbConnect.js";

async function StudentSeed() {
  try {
    // await StudentSchema.insertMany(Student);
    let student = {
      name: "User1",
      password: "Temp@1234",
      email: "user1@cfi.com",
    };
    student.password = await bcrypt.hash(student.password, 12);
    let studentData = new Student(student);
    await studentData.save();
    console.log("Student Seeded Successfully");
  } catch (error) {
    console.error(error);
  }
}

StudentSeed();
