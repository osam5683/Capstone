import bcrypt from "bcrypt";
import Admin from "../models/Admin/index.js";

import "../dbConnect.js";

async function insertAdmins() {
  try {
    let admin = {
      name: "Adnan Ali Khan",
      password: "Temp@123",
      email: "adnan@code.in",
      role: "admin",
    };
    admin.password = await bcrypt.hash(admin.password, 12);
    let adminData = new Admin(admin);
    await adminData.save();
    console.log("Admin Seeded Successfully");
  } catch (error) {
    console.error(error);
  }
}

insertAdmins();
