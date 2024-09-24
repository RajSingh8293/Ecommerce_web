import mongoose from "mongoose";
// const reviewsSchema = mongoose.Schema({
// 	name: {
// 		type: String,
// 		required: true,
// 	},
// 	rating: {
// 		type: Number,
// 		required: true,
// 	},
// 	comment: {
// 		type: String,
// 		required: true,
// 	},
// 	userId: {
// 		type: mongoose.Schema.Types.ObjectId,
// 		ref: 'User',
// 		required: true,
// 	},
// })

const ProductSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    productImage: {
      url: {
        type: String,
      },
      public_id: {
        type: String,
      },
    },
    // productImage: {
    //   type: String,
    //   required: true,
    // },
    // image: {
    //   url: {
    //     type: String,
    //   },
    //   public_id: {
    //     type: String,
    //   },
    // },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      required: true,
      type: String,
    },
    subCategory: {
      required: true,
      type: String,
    },
    color: {
      type: String,
      required: true,
    },
    sizes: {
      type: Array,
      required: true,
    },
    // reviews: [reviewsSchema],

    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
    ratings: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    countInStock: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema);
export default Product;
