import jwt from "jsonwebtoken";
import config from "config";

let private_key = config.get("PRIVATE_KEY");

function authMiddleware(req, res, next) {
  try {
    const token = req.cookies["auth-token"];
    const payLoad = jwt.verify(token, private_key);
    req.payLoad = payLoad;
    console.log(payLoad);
    // const miniCookie = req.cookies["verified"];
    // if (miniCookie === "false") {
    //   res.cookie("verified", true, {
    //     httpOnly: false,
    //     expires: new Date(Date.now() + 86400000 * 15), 
    //   });
    // }
    return next();
  } catch (error) {
    console.error(error);
    res.clearCookie("auth-token");
    res.cookie("verified", false); 
    res.status(500).json({ error: "Unauthorized Access! Please Login." });
  }
}
export default authMiddleware;
