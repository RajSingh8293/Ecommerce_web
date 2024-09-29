import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    // let token = req.cookies.token || req.header("Authorization")?.split(" ")[1];
    let token = req.cookies.token;
    console.log("token ", token);
    if (!token) {
      res.status(400).json({
        success: false,
        message: "Unauthorized user",
      });
      return;
    }

    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodeToken?._id);
    console.log("user ", user);
    req.user = user;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      res.status(401).json({
        success: false,
        message: "Token expired",
      });
    } else if (error.name === "JsonWebTokenError") {
      res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  }
};

export const isAdmin = (req, res, next) => {
  // console.log("req.user :", req.user);

  try {
    if (req.user && req.user?.role === "admin") {
      return next();
    } else {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
  } catch (error) {
    res
      .status(501)
      .json({ success: false, message: "Your are not able to get this page" });
  }
};
