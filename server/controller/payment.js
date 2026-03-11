import Razorpay from "razorpay";
import crypto from "crypto";
import User from "../models/user.js";
import dotenv from "dotenv";

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_placeholder",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "secret_placeholder",
});

export const createOrder = async (req, res) => {
  try {
    // Check if keys are placeholders (Test Mode)
    if (
      process.env.RAZORPAY_KEY_ID === "rzp_test_placeholder" ||
      !process.env.RAZORPAY_KEY_ID
    ) {
      return res.json({
        id: `order_mock_${Date.now()}`,
        currency: "INR",
        amount: 49900,
        status: "created",
      });
    }

    const options = {
      amount: 49900, // Amount in paise (e.g., 499.00 INR)
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.json(order);
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId } = req.body;

    // Mock Verification Check
    if (razorpay_order_id.startsWith("order_mock_")) {
      const updatedUser = await User.findByIdAndUpdate(userId, { isPremium: true }, { new: true });
      return res.json({ message: "Mock Payment verified successfully", user: updatedUser });
    }

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "secret_placeholder")
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      // Payment successful, update user status
      const updatedUser = await User.findByIdAndUpdate(userId, { isPremium: true }, { new: true });
      res.json({ message: "Payment verified successfully", user: updatedUser });
    } else {
      res.status(400).json({ message: "Invalid signature sent!" });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
