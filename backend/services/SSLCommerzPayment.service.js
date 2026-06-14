import SSLCommerzPayment from "sslcommerz-lts";
import Payment from "../models/payment.model.js";
import User from "../models/user.model.js";
import { validationSSLCommerzPayment } from "../validation/validationSSLCommerzPayment.js";

const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASSWORD;
const is_live = false;

const subscriptionAmount = () => {
  return 500;
};

export const createSubscriptionPaymentService = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  if (user.subscriptionStatus === "premium") {
    throw new Error("User already subscribed");
  }

  const amount = subscriptionAmount();

  const transactionId = `SUB_${Date.now()}`;

  await Payment.create({
    userId,
    amount,
    transactionId,
    status: "pending",
    paymentMethod: "SSLCommerz",
  });

  const data = {
    total_amount: amount,
    currency: "BDT",

    tran_id: transactionId,
    success_url: `${process.env.BACKEND_URL}/api/subscription/success/${transactionId}`,
    fail_url: `${process.env.BACKEND_URL}/api/subscription/fail/${transactionId}`,
    cancel_url: `${process.env.BACKEND_URL}/api/subscription/cancel/${transactionId}`,
    ipn_url: `${process.env.BACKEND_URL}/api/subscription/ipn`,

    shipping_method: "NO",
    product_name: "Premium Subscription",
    product_category: "Subscription",
    product_profile: "general",
    cus_name: user.name,
    cus_email: user.email,
    cus_add1: "N/A",
    cus_city: "Dhaka",
    cus_country: "Bangladesh",
    cus_phone: "01700000000",
  };

  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
  const response = await sslcz.init(data);
  return response.GatewayPageURL;
};

export const subscriptionSuccessService = async ({ tran_id }) => {
  await Payment.findOneAndUpdate(
    {
      transactionId: tran_id,
    },
    {
      status: "success",
    },
  );

  const payment = await Payment.findOne({
    transactionId: tran_id,
  });
  await User.findByIdAndUpdate(payment.userId, {
    subscriptionStatus: "premium",
    subscriptionStartDate: new Date(),
  });
};

export const subscriptionFailedService = async ({ tran_id }) => {
  await Payment.findOneAndUpdate(
    {
      transactionId: tran_id,
    },
    {
      status: "failed",
    },
  );
};

export const subscriptionCancelService = async ({ tran_id }) => {
  await Payment.findOneAndUpdate(
    {
      transactionId: tran_id,
    },
    {
      status: "cancelled",
    },
  );
};

//Instant Payment Notification Service
export const subscriptionIPNService = async ({ tran_id, val_id }) => {
  const payment = await Payment.findOne({
    transactionId: tran_id,
  });

  if (!payment) {
    throw new Error("PAYMENT_NOT_FOUND");
  }

  if (payment.status === "success") {
    return "ALREADY_PROCESSED";
  }

  //Do not Belive Payment without check validation from SSLCommerz
  const validationResponse = await validationSSLCommerzPayment(val_id);

  if (!validationResponse) {
    throw new Error("INVALID_PAYMENT");
  }

  const isValid =
    validationResponse.status === "VALID" &&
    validationResponse.tran_id === tran_id &&
    validationResponse.currency_type === "BDT";

  if (!isValid) {
    throw new Error("INVALID_PAYMENT");
  }

  await Payment.findOneAndUpdate(
    {
      transactionId: tran_id,
    },
    {
      status: "success",
    },
  );

  await User.findByIdAndUpdate(payment.userId, {
    subscriptionStatus: "premium",
    subscriptionStartDate: new Date(),
  });

  return "SUCCESS";
};
