const errorHandler = require("../functions/ErrorHandler");

function PaginateItems(model, soptions) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    let totalItems = await model.countDocuments().exec();

    results.next = endIndex < totalItems && {
      page: page + 1,
      limit,
    };
    results.prev = startIndex > 0 && {
      page: page - 1,
      limit,
    };

    try {
      results.results = await model
        .find()
        .select(soptions)
        .limit(limit)
        .skip(startIndex)
        .exec();
      results.totalProducts = totalItems;
      res.paginatedResults = results;
      next();
    } catch (err) {
      console.log(err);
      errorHandler(err, res);
    }
  };
}

module.exports = PaginateItems;
