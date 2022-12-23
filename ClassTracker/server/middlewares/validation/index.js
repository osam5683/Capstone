import { body, validationResult } from "express-validator";

function loginValidation() {
  return [
    body("email", "Email Is Required").isEmail(),
    body("password", "Passowrd is Required").notEmpty(),
  ];
}

function errorMiddleware(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  return next();
}
export { loginValidation, errorMiddleware };
