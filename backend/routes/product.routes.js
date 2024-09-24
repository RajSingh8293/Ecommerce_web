import express, { Router } from "express";

import { isAdmin, isAuthenticated } from "../middleware/auth.middleware.js";
import {
  allProducts,
  addProduct,
  adminAllProducts,
  deteleProductById,
  createProductReview,
  getAllReviews,
  getProductById,
  updateProduct,
  updateProductFeatured,
  deleteAllProducts,
  insertManyProducts,
  updateProductImage,
} from "../controllers/product.controllers.js";
import { upload } from "../middleware/file.middleware.js";

const router = express.Router();

// user
router.get("/products", allProducts);
router.get("/products/:id", getProductById);
router.put("/products/review", isAuthenticated, createProductReview);

// admin
router.post(
  "/product/create",
  upload.single("productImage"),
  isAuthenticated,
  isAdmin,
  addProduct
);

router.put(
  "/admin/products/update-image/:id",
  upload.single("productImage"),
  isAuthenticated,
  isAdmin,
  updateProductImage
);

router.get("/admin/products", isAuthenticated, isAdmin, adminAllProducts);
// router.get("/admin/products", isAuthenticated, isAdmin, adminAllProducts);
router.delete(
  "/admin/products/delete/:id",
  isAuthenticated,
  isAdmin,
  deteleProductById
);
router.delete(
  "/products/delete-all",
  isAuthenticated,
  isAdmin,
  deleteAllProducts
);
router.post("/products/insert", isAuthenticated, isAdmin, insertManyProducts);
router.put(
  "/admin/products/update/:id",
  isAuthenticated,
  isAdmin,
  updateProduct
);
router.patch("/products/featured/:id", isAuthenticated, updateProductFeatured);

router.get("/products/reviews", getAllReviews);
router.get("/products/reviews/:id", getAllReviews);

export default router;
