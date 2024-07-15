const { z } = require("zod");

const userValidatorSchema = z.object({
  mobile: z
    .string({
      required_error: "mobile Number must be present",
    })
    .regex(/^\d{10}$/, {
      message: "Invalid mobile number. It should be exactly 10 digits.",
    }),
  password: z
    .string({
      required_error: "password must be present",
    })
    .min(8, { message: "password must be 8 character long" })
    .trim(),
});

module.exports = userValidatorSchema;
