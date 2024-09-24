import express, { Router } from "express";
import { isAdmin, isAuthenticated } from "../middleware/auth.middleware.js";
import {
  createOrderController,
  deleteAllOrders,
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

router.delete(
  "/admin/order/delete/:id",
  isAuthenticated,
  isAdmin,
  deleteOrders
);
router.delete("/order/delete-all", isAuthenticated, isAdmin, deleteAllOrders);
router.put(
  "/admin/order-status/:id",
  isAuthenticated,
  isAdmin,
  updateOrderStatus
);
router.get("/admin/orders/all", isAuthenticated, isAdmin, getAllAdminOrders);

export default router;
