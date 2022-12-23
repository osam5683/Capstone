import jwt from "jsonwebtoken";
import config from "config";

let private_key = config.get("PRIVATE_KEY");

function generateToken(payload) {
  try {
    return jwt.sign(payload, private_key, { expiresIn: "15d" });
  } catch (error) {
    console.error(error);
  }
}

export default generateToken;
