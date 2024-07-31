const { z } = require("zod");

const productValidatorSchema = z.object({
  name: z
    .string({
      required_error: "product name is invalid",
    })
    .trim(),
  description: z.string({ required_error: "description is required" }),
  price: z.string({
    required_error: "price is invalid",
  }),
  discount: z.string({
    required_error: "discount price is invalid",
  }),
  productImage: z
    .string({
      required_error: "product main image is invalid",
    })
    .trim(),
  productImages: z.array(
    z.string({ required_error: "product image is required" })
  ),
  catagories: z
    .string({
      required_error: "categories is required",
    })
    .trim(),
  productUniqueId: z
    .string({
      required_error: "product unique id is required",
    })
    .trim(),
  stock: z.string(),
  tags: z.array(z.string()),
  isFeatured: z.boolean({
    required_error: "featured products is required",
    invalid_type_error: "isFeatured must be a boolean",
  }),
  isBestSeller: z.boolean({
    required_error: "best seller is required",
    invalid_type_error: "isBestSeller must be a boolean",
  }),
});

module.exports = productValidatorSchema;
