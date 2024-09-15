import Order from "../models/order.model.js";

// get all admin orders
export const getAllAdminOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    if (!orders) {
      res.status(402).json({
        success: false,
        message: "Orders is not found",
      });
    }

    let totalAmount = 0;

    orders.forEach((order) => {
      totalAmount += order.totalPrice;
    });

    res.json({
      success: true,
      message: "Successfull",
      orders,
      totalAmount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};
// get create order
export const createOrderController = async (req, res) => {
  // const userid = await User.findById(req.user?._id)

  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  const order = await Order({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user?._id,
    // user: userid
  });
  //   .populate({ path: "orderItems", populate: "product" });
  const orderdata = await order.save();

  if (!orderdata) {
    return res.status(402).json({
      success: false,
      message: "Orders is not found",
    });
  }
  return res.status(200).json({
    success: true,
    order: orderdata,
  });
};

// get single order user
export const OrderByIdController = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "username email")
      .populate({ path: "orderItems", populate: "product" });
    if (!order) {
      return res.status(402).json({
        success: false,
        message: "Order is not found",
      });
    }
    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: "Something wrong with getting order data",
      error,
    });
  }
};

// get logged in user's all orders
export const myOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user?._id });
    if (!orders) {
      res.status(400).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: "Something wrong with getting order data",
      error,
    });
  }
};

// get logged in user order
export const deleteOrders = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      res.status(400).json({
        success: false,
        message: "Order not found",
      });
    }
    const deleteOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deleteOrder) {
      res.status(402).json({
        success: false,
        message: "Order not found with this id",
      });
    }
    res.status(200).json({
      success: true,
      message: "Deleted order succefully",
      order: deleteOrder,
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: "Something wrong with getting order data",
      error,
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus, orderId } = req.body;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(402).json({
        success: false,
        message: "Order is not found",
      });
    }

    await Order.findByIdAndUpdate(
      order,
      { $set: { orderStatus } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: "Something wrong with getting order data",
      error,
    });
  }
};
