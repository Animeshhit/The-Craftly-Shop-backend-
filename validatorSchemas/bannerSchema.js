const { z } = require("zod");

const bannerSchema = z.object({
  bannerImage: z.string({
    required_error: "banner Image is a required field",
  }),
  bannerImageHash: z.string({
    required_error: "banner Image Placeholder string is required ",
  }),
  phoneBannerImage: z.string({
    required_error: "banner image for phone is required",
  }),
  phoneBannerImageHash: z.string({
    required_error: "phone banner image placeholder image is required",
  }),
  bannerLink: z
    .string({
      required_error: "banner image link is required",
    })
    .trim(),
  bannerText: z.string().trim(),
});

module.exports = bannerSchema;
