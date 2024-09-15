import express, { Router } from "express";

import { isAuthenticated } from "../middleware/auth.middleware.js";
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
} from "../controllers/product.controllers.js";

const router = express.Router();
// user
router.post("/product/create", isAuthenticated, addProduct);
// router.post('/product', upload.single("productImage"), addProductController)
router.get("/products", allProducts);
router.get("/products/:id", getProductById);
router.put("/products/review", isAuthenticated, createProductReview);

// admin
router.get("/products/admin", isAuthenticated, adminAllProducts);
router.delete("/products/delete/:id", isAuthenticated, deteleProductById);
router.delete("/products/delete-all", isAuthenticated, deleteAllProducts);
router.post("/products/insert", isAuthenticated, insertManyProducts);
router.put("/products/update/:id", isAuthenticated, updateProduct);
router.patch("/products/featured/:id", isAuthenticated, updateProductFeatured);

router.get("/products/reviews", getAllReviews);
router.get("/products/reviews/:id", getAllReviews);

export default router;
