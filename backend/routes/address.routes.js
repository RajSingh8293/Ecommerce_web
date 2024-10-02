import express, { Router } from "express";
import {
  deleteAddress,
  getAllAddresss,
  getMyAddresss,
  saveAddress,
  singleAddress,
  updateAddress,
} from "../controllers/address.controllers.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/address/create", isAuthenticated, saveAddress);
router.get("/address/get/:id", isAuthenticated, singleAddress);
router.put("/address/update/:id", isAuthenticated, updateAddress);
router.delete("/address/delete/:id", isAuthenticated, deleteAddress);
router.get("/address/get", isAuthenticated, getAllAddresss);
router.get("/address/my", isAuthenticated, getMyAddresss);

export default router;
