const errorHandler = require("../functions/ErrorHandler");

function PaginateItemsForHome(model, soptions) {
  return async (req, res, next) => {
    let { query } = req.query;

    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    let totalItems;

    if (query == "featured") {
      totalItems = await model.countDocuments({ isFeatured: true }).exec();
    } else if (query == "bestseller") {
      totalItems = await model.countDocuments({ isBestSeller: true }).exec();
    }

    results.next = endIndex < totalItems && {
      page: page + 1,
      limit,
    };
    results.prev = startIndex > 0 && {
      page: page - 1,
      limit,
    };

    try {
      if (query == "featured") {
        results.results = await model
          .find({ isFeatured: true })
          .select(soptions)
          .limit(limit)
          .skip(startIndex)
          .exec();
      } else if (query == "bestseller") {
        results.results = await model
          .find({ isBestSeller: true })
          .select(soptions)
          .limit(limit)
          .skip(startIndex)
          .exec();
      } else {
        return res.status(403).json({ message: "bad request" });
      }

      results.totalProducts = totalItems;
      res.paginatedResults = results;
      next();
    } catch (err) {
      console.log(err);
      errorHandler(err, res);
    }
  };
}

module.exports = PaginateItemsForHome;
