import Order from "../models/order.model.js";
import Product from "../models/product.model.js";

// get all admin orders
export const getAllAdminOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate({
      path: "orderItems",
      populate: "product",
    });
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
  // .populate({ path: "orderItems", populate: "product" });
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
    await Order.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Deleted order succefully",
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
    let order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(402).json({
        success: false,
        message: "Order is not found",
      });
    }

    if (order.orderStatus === "Delivered") {
      return res.status(400).json({
        success: false,
        message: "Your already delivered the Order",
      });
    }

    order.orderItems.forEach(async (order) => {
      await updateOrderStock(order._id, order.quantity);
    });
    order.orderStatus = req.body.orderStatus;
    // await Order.findByIdAndUpdate(
    //   order,
    //   { $set: { orderStatus } },
    //   { new: true }
    // );

    await order.save();
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

async function updateOrderStock(id, quantity) {
  const product = await Product.findById(id);
  console.log("product :", product);

  product.countInStock = product.countInStock - quantity;
  // product.countInStock -= quantity;
  await product.save({ validateBeforeSave: false });
}

export const deleteAllOrders = async (req, res) => {
  try {
    const orders = await Order.deleteMany({});
    if (!orders) {
      res.status(400).json({
        success: false,
        message: "Orders not deleted",
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Orders deleted Successfully",
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
