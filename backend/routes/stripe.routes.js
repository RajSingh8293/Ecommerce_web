import express, { Router } from "express";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import { paymentProcessController } from "../controllers/stripe.controllers.js";

const router = express.Router();

router.post("/payment/process", isAuthenticated, paymentProcessController);
// router.get("/stripeapikey", secretStripeKey);

export default router;
