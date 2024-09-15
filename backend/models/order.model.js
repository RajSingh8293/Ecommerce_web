import mongoose from "mongoose";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    shippingInfo: [
      {
        firstname: {
          type: String,
          required: true,
        },
        lastname: {
          type: String,
          required: true,
        },
        address: {
          type: String,
          required: true,
        },
        country: {
          type: String,
          required: true,
        },
        state: {
          type: String,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },
        zipcode: {
          type: Number,
          required: true,
        },
        phone: {
          type: Number,
          required: true,
        },
      },
    ],
    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        name: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        size: {
          type: String,
          required: true,
        },
      },
    ],
    paymentInfo: {
      paymentMethod: {
        type: String,
      },
      status: {
        type: String,
      },
      id: {
        type: String,
      },
    },

    itemsPrice: {
      type: Number,
      default: 0.0,
      required: true,
    },
    shippingPrice: {
      type: Number,
      default: 0,
      required: true,
    },
    taxPrice: {
      type: Number,
      default: 0,
      required: true,
    },
    totalPrice: {
      type: Number,
      default: 0,
      required: true,
    },
    orderStatus: {
      type: String,
      default: "Processing",
      required: true,
    },
    paidAt: {
      type: Date,
      default: Date.now(),
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },

    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },

    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
