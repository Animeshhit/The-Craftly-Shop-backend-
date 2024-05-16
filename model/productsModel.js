const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  productName: {
    type: String,
    required: [true, "product name is required"],
  },
  productDescription: {
    type: String,
  },
  variants: [
    {
      type: String,
    },
  ],
  price: {
    type: Number,
    required: [true, "product price is required"],
  },
  discount: {
    type: Number,
    required: [true, "product discount is required"],
  },
  productImage: {
    type: String,
    required: [true, "product iamge is required"],
  },
  productImages: [{ type: String }],
  catagories: {
    type: String,
  },
  productUniqueId: {
    type: String,
    unique: [true, "product unique key is important"],
    require: true,
  },
});

module.exports = mongoose.model("product", ProductSchema);
