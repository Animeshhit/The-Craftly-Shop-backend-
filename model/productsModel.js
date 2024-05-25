const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  productName: {
    type: String,
    required: [true, "product name is required"],
  },
  productDescription: {
    type: String,
  },
  variants: {
    type:Array,
    default:[]
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
    type:Array,
    default:[]
  },
  catagories: {
    type: String,
    required:[true,"catagories is required"]
  },
  productUniqueId: {
    type: String,
    unique: [true, "product unique key is important"],
    require: true,
  },
  isFeatured:{
    type:Boolean,
    default:false
  },
  reviews:{
    type:Array,
    default:[]
  },
  sold:{
    type:Number,
    default:0
  },
});

module.exports = mongoose.model("product", ProductSchema);
