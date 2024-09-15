import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import crypto from "crypto";

export const authToken = (id) => {
  const token = jwt.sign({ _id: id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
};

export const authHashPassword = (password) => {
  const hashPassword = bcryptjs.hashSync(password, 8);
  return hashPassword;
};

export const comparePassword = (password, hashPassword) => {
  const isMatch = bcryptjs.compareSync(password, hashPassword);
  return isMatch;
};

// export const getResetPasswordToken = (user) => {
//   // generate token
//   const resetToken = crypto.randomBytes(20).toString("hex");

//   //   hash and add resetPasswordToken to userSchema
//   user.resetPasswordToken = crypto
//     .createHash("sha256")
//     .update(resetToken)
//     .digest("hex");

//   user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

//   return resetToken;
// };
