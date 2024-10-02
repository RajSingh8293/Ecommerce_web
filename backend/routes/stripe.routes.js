import express, { Router } from "express";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import { paymentProcessController, stripePublicKey } from "../controllers/stripe.controllers.js";

const router = express.Router();

router.post("/payment/process", isAuthenticated, paymentProcessController);
router.get("/stripepublickey", isAuthenticated, stripePublicKey);

export default router;
