import { createSubscriptionPaymentService,
        subscriptionSuccessService,
        subscriptionFailedService,
        subscriptionCancelService,
        subscriptionIPNService
 } from "../services/SSLCommerzPayment.service.js";

export const initiateSubscriptionController = async (request, response) => {
  try {
    const userId = request.session.userId;
    console.log("User ID from session:", userId);
    const paymentUrl = await createSubscriptionPaymentService(userId);

    return response.status(200).json({
      success: true,
      error: false,
      url: paymentUrl,
    });
  } catch (error) {
    return response.status(500).json({
      error: true,
      success: false,
      message: error.message,
    });
  }
};

export const subscriptionSuccessController = async (request, response) => {
  const userId = request.session.userId;
  const { tran_id } = request.params;
  await subscriptionSuccessService({ tran_id, userId });
  return response.redirect(
    `${process.env.FRONTEND_URL}/success/${tran_id}`,
  );
};


export const subscriptionFailedController = async (request, response) => {
  const { tran_id } = request.params;
  await subscriptionFailedService({ tran_id });
  return response.redirect(
    `${process.env.FRONTEND_URL}/failed/${tran_id}`,
  );
};

export const subscriptionCancelController = async (request, response) => {
  const { tran_id } = request.params;
  await subscriptionCancelService({ tran_id });
  return response.redirect(
    `${process.env.FRONTEND_URL}/cancel/${tran_id}`,
  );
};

export const subscriptionIPNController = async (request, response) => {
  const { tran_id,  val_id, } = request.body;
  await subscriptionIPNService({ tran_id,  val_id, });
  return response.status(200).json({
    success: true,
    message: "IPN processed successfully",
  });
};
