import { list } from "../services/product.service.js";
import logger from "../utils/logger.js";
import { buildErrorResponse, buildSuccessResponse } from "../utils/utils.js";

export const get = async (req, res, next) => {
  const { limit, offset, query } = req.query;

  // TODO: These could be moved to a middleware
  const limitInt = isNumber(limit);
  const offsetInt = isNumber(offset);

  if (limit === undefined || limit < 1 || !limitInt) {
    return res
      .status(400)
      .json(buildErrorResponse("Limit must be number and greater than 0"));
  }

  if (offsetInt === undefined) {
    return res.status(400).json(buildErrorResponse("Offset must be a number"));
  }

  try {
    const products = await list(limitInt, offsetInt, query);
    res.json(buildSuccessResponse(products));
  } catch (error) {
    logger.error(error);
    res.status(500).json(buildErrorResponse(error));
  }
};

const isNumber = (param) => {
  const number = parseInt(param, 10);
  return isNaN(number) ? undefined : number;
};
