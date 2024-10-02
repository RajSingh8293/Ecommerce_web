import Address from "../models/address.model.js";
import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getAllAddresss = async (req, res) => {
  let address = await Address.find();

  if (!address) {
    return res.status(400).json({
      message: "address not found!",
    });
  }

  try {
    res.status(200).json({
      success: true,
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

export const getMyAddresss = async (req, res) => {
  const user = req.user;
  const address = await Address.find({
    userId: user._id,
  });
  try {
    if (!address) {
      return res.status(400).json({
        message: "address not found!",
      });
    }

    res.status(200).json({
      success: true,
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

// save address
export const saveAddress = asyncHandler(async (req, res) => {
  const { firstname, lastname, phone, country, state, city, address, zipcode } =
    req.body;

  const user = await User.findById(req.user?._id);

  let createtAddress = await Address.create({
    userId: req.user?._id,
    firstname,
    lastname,
    phone,
    country,
    state,
    city,
    address,
    zipcode,
  });
  try {
    user.shippingAddress.push(createtAddress._id);
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
});

export const deleteAddress = asyncHandler(async (req, res) => {
  let address = await Address.findById(req.params.id);

  await Address.findByIdAndDelete(address);

  res.status(200).json({
    success: true,
    message: "Delete successfully",
  });
});

export const singleAddress = asyncHandler(async (req, res) => {
  let address = await Address.findById(req.params.id);
  res.status(200).json({
    success: true,
    address,
  });
});

export const updateAddress = asyncHandler(async (req, res) => {
  let address = await Address.findById(req.params.id);

  if (!address) {
    res.status(400).json({
      success: true,
      message: "Address not found",
    });
  }

  const updateAdd = await Address.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json({
    success: true,
    message: "Update successfully",
    updateAdd,
  });
});
