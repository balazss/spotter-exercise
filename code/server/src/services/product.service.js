import { findMany } from "../repositories/product.repository.js";

export const list = async (
  limit = undefined,
  offset = undefined,
  query = ""
) => {
  return await findMany(limit, offset, query);
};
