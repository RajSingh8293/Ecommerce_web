import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const paymentProcessController = async (req, res) => {
  const { amount } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      description: "Software development",
      metadata: {
        company: "Ecommerce",
      },
    });

    res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      meassage: "Payment succefully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const stripePublicKey = async (req, res) => {
  return res.status(200).json({
    success: true,
    stripeApiKey: process.env.STRIP_PUBLIC_KEY,
  });
};

