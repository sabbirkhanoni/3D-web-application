import {
  initiateSubscriptionController,
  subscriptionSuccessController,
  subscriptionFailedController,
  subscriptionCancelController,
  subscriptionIPNController,
} from "../controllers/SSLCommerzPayment.controller.js";

import express from "express";

const router = express.Router();

router.post("/initiate", initiateSubscriptionController);
router.get("/success/:tran_id", subscriptionSuccessController);
router.get("/failed/:tran_id", subscriptionFailedController);
router.get("/cancel/:tran_id", subscriptionCancelController);
router.post("/ipn", subscriptionIPNController);

export default router;
