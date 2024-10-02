import { deleteOnCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";
import User from "../models/user.model.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import {
  authHashPassword,
  authToken,
  comparePassword,
} from "../middleware/authToken.js";
import { sendEmail } from "../middleware/sendEmail.js";
import { frontendApi } from "../frontendApi/frontendapi.js";
import { sendResponse } from "../utils/sendResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Address from "../models/address.model.js";

// register user
export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username) {
    return res.status(422).json({ message: "Username is required !" });
  }
  if (!email) {
    return res.status(422).json({ message: "Email is required !" });
  }
  if (!password) {
    return res.status(422).json({ message: "Password is required !" });
  }

  // existing user
  const existsUser = await User.findOne({ email });
  if (existsUser) {
    return res
      .status(400)
      .json({ success: false, message: "User already exists !" });
  }

  // password hash
  const hashPassword = authHashPassword(password);

  const userdata = new User({
    username,
    email,
    password: hashPassword,
  });

  const user = await userdata.save();

  sendResponse(res, user, 201, "Register Successfully");
});

// login user
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!password) {
    return res
      .status(404)
      .json({ success: false, message: "Password is required !" });
  }
  if (!email) {
    return res
      .status(404)
      .json({ success: false, message: "Email is required !" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(400).send({
      success: false,
      message: "User does not exists",
    });
  }

  const isMatch = comparePassword(password, user.password);
  if (!isMatch) {
    res.status(400).send({
      success: false,
      message: "Invalid credentials !",
    });
  }

  sendResponse(res, user, 200, "Logged in Successfully");
});
// login Admin
export const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!password) {
    return res
      .status(404)
      .json({ success: false, message: "Password is required !" });
  }
  if (!email) {
    return res
      .status(404)
      .json({ success: false, message: "Email is required !" });
  }

  const findAdmin = await User.findOne({ email });
  if (!findAdmin) {
    res.status(400).send({
      success: false,
      message: "User does not exists",
    });
  }
  if (findAdmin?.role !== "admin") {
    res.status(400).send({
      success: false,
      message: "Not authorized",
    });
  }

  const isMatch = comparePassword(password, findAdmin.password);
  if (!isMatch) {
    res.status(400).send({
      success: false,
      message: "Invalid credentials !",
    });
  }

  sendResponse(res, findAdmin, 200, "Logged in Successfully");
});

// logout user
export const logoutUser = asyncHandler(async (req, res) => {
  try {
    return res
      .status(200)
      .clearCookie("token", {
        maxAge: 0,
        httpOnly: true,
        secure: true,
        sameSite: "None",
      })
      .json({
        success: true,
        message: "User logged Out",
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something wrong with logged Out",
    });
  }
});

// profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user?._id).populate({
      path: "shippingAddress",
    });
    // console.log("user :", user);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User found successfully",
      user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error with get profile",
      error,
    });
  }
};

// save address
export const saveAddress = async (req, res) => {
  const { firstname, lastname, phone, country, state, city, address, zipcode } =
    req.body;

  let user = await User.findById(req.user?._id);
  if (!user) {
    return res.status(400).json({
      message: "User not found!",
    });
  }

  try {
    const userAddress = {
      userId: req.user._id,
      firstname,
      lastname,
      phone: Number(phone),
      country,
      state,
      city,
      address,
      zipcode,
    };

    const createAddress = await Address.create(userAddress);
    user.shippingAddress.push(createAddress._id);
    const saveUser = await user.save();

    res.status(200).json({
      success: true,
      message: "Address update successfully",
      user: saveUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something wrong with save address",
      error,
    });
  }
};

export const getMyAddresss = async (req, res) => {
  let address = await Address.findById(req.user?._id);
  if (!address) {
    return res.status(400).json({
      message: "address not found!",
    });
  }

  try {
    res.status(200).json({
      success: true,
      message: "Address update successfully",
      address,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something wrong with save address",
      error,
    });
  }
};

export const deleteAddress = async (req, res) => {
  // let user = await User.findById(req.user?._id);
  // if (!user) {
  //   return res.status(400).json({
  //     message: "User not found!",
  //   });
  // }

  let address = await Address.findById(req.params.id);
  try {
    const deleteAdd = await Address.findByIdAndDelete(address);

    res.status(200).json({
      success: true,
      message: "Delete update successfully",
      user: deleteAdd,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something wrong with save address",
      error,
    });
  }
};

// update profile
export const updateProfile = asyncHandler(async (req, res) => {
  const { username, email } = req.body;

  const user = await User.findById(req.user?._id).select("-password");
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User not found",
    });
  }

  const userUpdate = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        username,
        email,
      },
    },
    { new: true }
  );

  sendResponse(res, userUpdate, 200, "User updated  Successfully");
});

// delete account himself user
export const deleteProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user?._id);
    console.log(user);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }
    await deleteOnCloudinary(user?.profileImage?.public_id);
    await User.findByIdAndDelete(user);

    return res
      .status(200)
      .clearCookie("token", {
        maxAge: 0,
        httpOnly: true,
        secure: true,
        sameSite: "None",
      })
      .json({
        success: true,
        message: "Account deleted successfully",
      });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error with get profile",
      error,
    });
  }
};

export const updateUserRole = async (req, res) => {
  const { role } = req.body;
  const findUser = await User.findById(req.params.id);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      findUser,
      {
        role: role,
      },
      {
        new: true,
      }
    );
    res.status(200).json({
      success: true,
      message: "Update user role successfully",
      updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something wrong with save address",
      error,
    });
  }
};

// update profile image
export const updateProfileImage = async (req, res) => {
  try {
    let user = await User.findById(req.user?._id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const filename = req.file?.path;
    await deleteOnCloudinary(user?.avtar?.public_id);

    const image = await uploadOnCloudinary(filename);

    const userUpdate = await User.findByIdAndUpdate(
      req.user?._id,
      {
        $set: {
          avtar: {
            public_id: image.public_id,
            url: image.url,
          },
        },
      },
      { new: true }
    );

    sendResponse(res, userUpdate, 200, "Profile image updated successfully");
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
      message: "Something wrong with update profile image",
    });
  }
};

// change password
export const changeCurrentPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user?._id);
  const isPasswordCorrect = bcryptjs.compareSync(oldPassword, user.password);

  if (!isPasswordCorrect) {
    res.status(400).json({
      success: false,
      message: "Password incorrect!",
    });
  }

  user.password = newPassword;
  const updatePassword = await user.save({ validateBeforeSave: false });

  sendResponse(res, updatePassword, 200, "Password changed  successfully");
};

// delete user account by admin
export const deleteUserAccount = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User deleted exist",
      });
    }

    await deleteOnCloudinary(user?.avtar?.public_id);
    await User.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error with get profile",
      error,
    });
  }
};

// admin get users
export const allUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      res.status(400).json({
        success: false,
        message: "Data not found",
      });
      return;
    }
    return res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
      message: "Something wrong with update profile image",
    });
  }
};

// get user account by id admin
export const getUserAccountById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User successfully",
      user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error with get profile",
      error,
    });
  }
};

// forgot password
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User does not exist",
    });
  }

  // generate random token for user
  // const generateToken = crypto.randomBytes(20);
  // if (!generateToken) {
  //   return res.status(400).json({
  //     success: false,
  //     message: "An error accured. Please try again later",
  //   });
  // }

  // converting the token to hexstring
  // const convertTokenToHexString = generateToken.toString("hex");
  // user.resetPasswordToken = convertTokenToHexString;
  // user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  //  Or

  const generateToken = crypto.randomBytes(20).toString("hex");
  if (!generateToken) {
    return res.status(400).json({
      success: false,
      message: "An error accured. Please try again later",
    });
  }

  user.resetPasswordToken = crypto
    .createHash("sha256")
    .update(generateToken)
    .digest("hex");

  // expire will be after 15 minutes
  user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  try {
    const saveToken = await user.save({ validateBeforeSave: false });

    // create link for email
    const resetPasswordUrl = `${frontendApi}/reset-password/${user.resetPasswordToken}`;

    // create msg for for send email
    const message = `Please click on the following link Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this request then please ignore it`;

    const data = {
      email: user.email,
      subject: "Password Reset",
      message,
    };
    await sendEmail(data);

    return res.status(200).json({
      success: true,
      message: "Email sent to ${user.email} successfully",
      user: {
        resetPasswordToken: saveToken.resetPasswordToken,
        resetPasswordExpire: saveToken.resetPasswordExpire,
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error with get profile",
      error,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { password, confirmPassword } = req.body;

    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Reset password token is invalid or has been expired",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password does not match!",
      });
    }

    const hashPassword = authHashPassword(password);

    // await User.findOneAndUpdate(
    //   user,
    //   {
    //     $set: {
    //       password: hashPassword,
    //       resetPasswordToken: undefined,
    //       resetPasswordExpire: undefined,
    //     },
    //   },
    //   { new: true }
    // );

    user.password = hashPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Passsword update successfully",
      user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error with reseting password",
      error,
    });
  }
};
