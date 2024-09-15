import express, { Router } from "express";
import {
  allUsers,
  changeCurrentPassword,
  deleteProfile,
  deleteUserAccount,
  forgotPassword,
  getProfile,
  getUserAccountById,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  updateProfile,
  updateProfileImage,
} from "../controllers/user.controllers.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/file.middleware.js";
import { saveAddress } from "../controllers/product.controllers.js";

const router = Router();

// user
router.post("/user/register", registerUser);
router.post("/user/login", loginUser);
router.get("/user/logout", logoutUser);

router.post("/forgot-password", forgotPassword);
// router.put("/reset-password", resetPassword);
router.put("/reset-password/:token", resetPassword);

// user
router.get("/user/me", isAuthenticated, getProfile);
router.put("/user/update/me", isAuthenticated, updateProfile);
router.post("/user/change-paasword", isAuthenticated, changeCurrentPassword);
router.put(
  "/user/update/profile-image",
  upload.single("avtar"),
  isAuthenticated,
  updateProfileImage
);
router.delete("/user/delete/me", isAuthenticated, deleteProfile);
router.put("/user/save-address", isAuthenticated, saveAddress);

// admin
router.get("/user/all", allUsers);
router.delete("/user/admin/delete/:id", isAuthenticated, deleteUserAccount);
router.get("/user/admin/get/:id", isAuthenticated, getUserAccountById);

export default router;
