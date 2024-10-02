import express, { Router } from "express";
import {
  allUsers,
  changeCurrentPassword,
  deleteAddress,
  deleteProfile,
  deleteUserAccount,
  forgotPassword,
  getMyAddresss,
  getProfile,
  getUserAccountById,
  loginAdmin,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  saveAddress,
  updateProfile,
  updateProfileImage,
  updateUserRole,
} from "../controllers/user.controllers.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/file.middleware.js";

const router = Router();

// user
router.post("/user/register", registerUser);
router.post("/user/login", loginUser);
router.post("/admin/login", loginAdmin);
router.get("/user/logout", logoutUser);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:token", resetPassword);
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
router.delete("/user/delete-address/:id", isAuthenticated, deleteAddress);
router.get("/adress/get", isAuthenticated, getMyAddresss);

// admin
router.get("/user/all", allUsers);
router.delete("/user/admin/delete/:id", isAuthenticated, deleteUserAccount);
router.get("/user/admin/get/:id", isAuthenticated, getUserAccountById);
router.put("/user/role/update/:id", isAuthenticated, updateUserRole);

export default router;
