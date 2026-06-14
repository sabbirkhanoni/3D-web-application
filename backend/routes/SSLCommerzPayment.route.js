import {
  initiateSubscriptionController,
  subscriptionSuccessController,
  subscriptionFailedController,
  subscriptionCancelController,
  subscriptionIPNController,
} from "../controllers/SSLCommerzPayment.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { Router } from "express";

const router = Router();

router.post("/initiate", isAuthenticated, initiateSubscriptionController);
router.route("/success/:tran_id").get(subscriptionSuccessController).post(subscriptionSuccessController);
router.route("/failed/:tran_id").get(subscriptionFailedController).post(subscriptionFailedController);
router.route("/cancel/:tran_id").get(subscriptionCancelController).post(subscriptionCancelController);
router.post("/ipn", subscriptionIPNController);

export default router;
