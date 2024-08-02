const errorHandler = require("../functions/ErrorHandler");

function PaginateItemsForSearch(model, soptions) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const query = req.query.q;
    if (!query) {
      return res.status(400).send({ message: "Query parameter is required" });
    }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    let totalItems = await model
      .countDocuments({
        $or: [
          { name: { $regex: query, $options: "i" } },
          { description: { $regex: query, $options: "i" } },
          { catagories: { $regex: query, $options: "i" } },
          { tags: { $regex: query, $options: "i" } },
        ],
      })
      .exec();

    try {
      results.results = await model
        .find({
          $or: [
            { name: { $regex: query, $options: "i" } },
            { description: { $regex: query, $options: "i" } },
            { catagories: { $regex: query, $options: "i" } },
            { tags: { $regex: query, $options: "i" } },
          ],
        })
        .select(soptions)
        .limit(limit)
        .skip(startIndex)
        .exec();

      // totalItems = results.results.length;
      // console.log(totalItems, endIndex);

      results.next = endIndex < totalItems && {
        page: page + 1,
        limit,
      };
      results.prev = startIndex > 0 && {
        page: page - 1,
        limit,
      };
      results.totalProducts = totalItems;
      res.paginatedResults = results;
      next();
    } catch (err) {
      console.log(err);
      errorHandler(err, res);
    }
  };
}

module.exports = PaginateItemsForSearch;
