const mongoose = require("mongoose");

const ctgSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "product name is required"],
    unique: [true, "This Categories Is Already Been Added"],
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

ctgSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const CtgModel = mongoose.model("categorie", ctgSchema);

module.exports = CtgModel;
