const mongoose = require("mongoose");

const DraftsSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "product name is required"],
  },
  description: {
    type: String,
    required: [true, "product description is required"],
  },
  variants: {
    type: Array,
    default: [],
  },
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
  productImages: {
    type: Array,
    default: [],
  },
  catagories: {
    type: String,
    required: [true, "catagories is required"],
  },
  productUniqueId: {
    type: String,
    unique: [true, "product unique key is important"],
    required: true,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  isBestSeller: {
    type: Boolean,
    default: false,
  },
  reviews: {
    type: Array,
    default: [],
  },
  stock: {
    type: Number,
    default: 0,
  },
  sold: {
    type: Number,
    default: 0,
  },
  tags: {
    type: [{ type: String }],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

DraftsSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("draft", DraftsSchema);
