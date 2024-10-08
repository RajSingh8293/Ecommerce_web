import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avtar: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },

    role: {
      type: String,
      default: "user",
    },
    shippingAddress: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
        required: true,
      },
    ],
    cart: {
      type: Array,
      default: [],
    },
    resetPasswordToken: String,
    resetPasswordExpire: String,
  },

  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
