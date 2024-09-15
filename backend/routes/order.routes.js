import express, { Router } from "express";
import { isAdmin, isAuthenticated } from "../middleware/auth.middleware.js";
import {
  createOrderController,
  deleteOrders,
  getAllAdminOrders,
  myOrders,
  OrderByIdController,
  updateOrderStatus,
} from "../controllers/order.controllers.js";

const router = Router();

router.post("/order/create", isAuthenticated, createOrderController);
router.get("/order/me", isAuthenticated, myOrders);
router.get("/order/:id", isAuthenticated, OrderByIdController);

router.delete("/admin/order/:id", isAuthenticated, isAdmin, deleteOrders);
router.put("/admin/order-status", isAuthenticated, isAdmin, updateOrderStatus);
router.get("/orders/all", isAuthenticated, isAdmin, getAllAdminOrders);

export default router;
