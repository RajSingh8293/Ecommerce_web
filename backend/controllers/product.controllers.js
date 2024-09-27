import Product from "../models/product.model.js";
import { productsdata } from "../productsdata.js";
import ApiFeatures from "../utils/ApiFeatures.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { deleteOnCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";

export const deleteAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.deleteMany({});
    if (!products) {
      res.status(400).json({
        success: false,
        message: "Products not deleted",
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Products deleted Successfully",
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      message: "Something went wrong",
    });
  }
});
export const insertManyProducts = asyncHandler(async (req, res) => {
  try {
    // const data = productsdata?.map((data) => data);
    const products = Product.insertMany(productsdata);
    if (!products) {
      res.status(400).json({
        success: false,
        message: "Products not deleted",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Products created succefully",
      products,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

export const allProducts = asyncHandler(async (req, res) => {
  try {
    const resulPerPage = 100; // per page 10 items
    const totalProducts = await Product.countDocuments();
    let apiFeatures = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter()
      .pagination(resulPerPage);

    let products = await apiFeatures.query;
    // console.log("products 1:", products);
    const filterProductCount = await products.length;

    const pages = Math.ceil(totalProducts / resulPerPage); // total pages
    // console.log("pages :", pages);

    // const products = await Product.find();

    res.status(200).json({
      success: true,
      products,
      totalProducts,
      resulPerPage,
      filterProductCount,
      pages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong to get products",
    });
  }
});

export const adminAllProducts = asyncHandler(async (req, res) => {
  try {
    const resulPerPage = 20; // per page 20 items
    const totalProducts = await Product.countDocuments();
    const currentPage = parseInt(req.query.page) || 1;
    const skip = resulPerPage * (currentPage - 1);

    const pages = Math.ceil(totalProducts / resulPerPage);
    const products = await Product.find().limit(resulPerPage).skip(skip);
    const filterProductCount = products.length;

    if (!products) {
      res.status(400).json({
        success: false,
        message: "Products not found",
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Successfully",
      products,
      totalProducts,
      filterProductCount,
      pages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }

  // try {
  //   const products = await Product.find();
  //   console.log("products :", products);
  //   if (!products) {
  //     res.status(400).json({
  //       success: false,
  //       message: "Product not found",
  //     });
  //   }
  //   res.status(200).json({
  //     success: true,
  //     products,
  //   });
  // } catch (error) {
  //   res.status(500).json({
  //     success: false,
  //     message: "Something went with get all admin data",
  //     error,
  //   });
  // }
});

// add product
export const addProduct = asyncHandler(async (req, res) => {
  try {
    const user = req.user;

    const {
      name,
      type,
      title,
      description,
      category,
      price,
      featured,
      countInStock,
      color,

      sizes,
      subCategory,
    } = req.body;
    // const productdata = await Product(req.body);

    const file = req.file?.path;

    console.log("file : ", file);

    const image = await uploadOnCloudinary(file);
    const productdata = await Product({
      userId: user._id,
      name,
      type,
      title,
      productImage: {
        url: image?.secure_url,
        public_id: image?.public_id,
      },
      description,
      category,
      price,
      featured,
      countInStock,
      color,

      // sizes,
      sizes: JSON.parse(sizes),
      subCategory,
    });
    const product = await productdata.save();
    // console.log("productsave :", product);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
});

// get product by id
export const getProductById = asyncHandler(async (req, res) => {
  try {
    const productById = await Product.findById(req.params.id);
    if (!productById) {
      res.status(400).json({
        success: false,
        message: "Product not found",
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Successfully",
      product: productById,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

// delete product by id
export const deteleProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    console.log(product);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    await deleteOnCloudinary(product?.productImage?.public_id);
    // await cloudinary.v2.uploader.upload.destroy(product.productImage.url)

    const productdata = await Product.findByIdAndDelete(req.params.id);
    if (productdata) {
      return res
        .status(200)
        .json({ success: true, message: "Product deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong product not deleted",
    });
  }
};

// update
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Update not found",
      });
    }
    const updateData = await Product.findByIdAndUpdate(product, req.body, {
      new: true,
    });

    if (updateData) {
      return res.status(200).json({
        success: true,
        message: "Product updated successfully",
      });
    }
  } catch (error) {
    res.status(501).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// update product image
export const updateProductImage = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(400).json({
        success: false,
        message: "Product not found",
      });
    }

    const filename = req.file?.path;
    console.log("filename :", filename);

    await deleteOnCloudinary(product?.productImage?.public_id);
    const image = await uploadOnCloudinary(filename);

    const updateImage = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          productImage: {
            public_id: image.public_id,
            url: image.url,
          },
        },
      },
      { new: true }
    );

    // if (filename) {
    //   // user.profile.resume = image.secure_url;
    //   product.productImage = {
    //     public_id: image?.public_id,
    //     url: image?.url,
    //   };
    // }

    // const updateImage = await product.save();

    return res.status(200).json({
      success: true,
      message: "Product image updated successfully",
      product: updateImage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
      message: "Something wrong with update profile image",
    });
  }
};

export const updateProductFeatured = async (req, res) => {
  try {
    const { featured } = req.body;
    const product = await Product.findById(req.params.id);
    console.log(product);
    if (!product) {
      res.status(400).json({
        success: false,
        message: "Product not found",
      });
    }

    await Product.findByIdAndUpdate(
      req.params.id,
      { $set: { featured } },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Feature update successfully",
      product,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const createProductReview = async (req, res) => {
  const user = req.user;

  const { rating, comment, productId } = req.body;
  try {
    const review = {
      user: user._id,
      name: user.username,
      rating: Number(rating),
      comment,
    };

    const product = await Product.findById(productId);
    console.log("product :", product);

    const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === user._id.toString()
    );

    console.log("isReviewed :", isReviewed);

    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === user._id.toString())
          (rev.rating = rating), (rev.comment = comment);
      });
    } else {
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
    }

    // ratings in side the product model
    // let avg = 0;
    // product.reviews.forEach((rev) => {
    //   avg = avg + rev.rating;
    // });
    // product.ratings = avg / product.reviews.length;
    // await product.save({ validateBeforeSave: false });

    product.ratings =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();

    res.status(201).json({
      success: true,
      message: "Rating Successfull",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Sometging wrong with review",
      error,
    });
  }
};

export const getAllReviews = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(400).json({
        success: false,
        message: "Product not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Sometging wrong with get all reviews",
      error,
    });
  }
};
