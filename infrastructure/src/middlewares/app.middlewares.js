import { buildErrorResponse } from "../utils/utils.js";

export const allowedHttpMethods = (req, res, next) => {
  const allowedMethods = ["GET"];
  if (!allowedMethods.includes(req.method)) {
    return res.status(405).json(buildErrorResponse(["Method Not Allowed"]));
  }
  return next();
};

/**
 * AllowedContentType middleware.
 *
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
export const allowedContentType = (req, res, next) => {
  if (
    (req.method === "POST" || req.method === "PUT") &&
    !req.is("application/json")
  ) {
    return res
      .status(415)
      .json(buildErrorResponse(["Unsupported Content-Type"]));
  }
  return next();
};
